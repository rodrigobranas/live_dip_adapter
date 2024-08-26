import pgp from "pg-promise";
import Ticket from "./Ticket";
import DatabaseConnection from "./DatabaseConnection";

export default interface TicketRepository {
	saveTicket (ticket: Ticket): Promise<void>;
	getTicket (ticketId: string): Promise<Ticket>;
}

export class TicketRepositoryDatabase implements TicketRepository {

	constructor (readonly connection: DatabaseConnection) {
	}
	
	async saveTicket (ticket: Ticket): Promise<void> {
		await this.connection.query("insert into branas.ticket (ticket_id, event_id, email, price) values ($1, $2, $3, $4)", [ticket.ticketId, ticket.eventId, ticket.getEmail(), ticket.price]);
	}

	async getTicket (ticketId: string): Promise<Ticket> {
		const [ticketData] = await this.connection.query("select * from branas.ticket where ticket_id = $1", [ticketId]);
		return new Ticket(ticketData.ticket_id, ticketData.event_id, ticketData.email, parseFloat(ticketData.price));
	}
}

export class TicketRepositoryFake implements TicketRepository {
	tickets: Ticket[] = [];
	private static instance: TicketRepositoryFake;

	private constructor () {
	}

	async saveTicket(ticket: Ticket): Promise<void> {
		this.tickets.push(ticket);
	}

	async getTicket(ticketId: string): Promise<Ticket> {
		const ticket = this.tickets.find((ticket: Ticket) => ticket.ticketId === ticketId);
		if (!ticket) throw new Error("Ticket not found");
		return ticket;
	}

	static getInstance () {
		if (!TicketRepositoryFake.instance) {
			TicketRepositoryFake.instance = new TicketRepositoryFake();
		}
		return TicketRepositoryFake.instance;
	}
}
