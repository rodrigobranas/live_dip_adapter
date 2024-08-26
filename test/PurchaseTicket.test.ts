import { PgPromiseAdapter } from "../src/DatabaseConnection";
import { EventRepositoryDatabase, EventRepositoryFake } from "../src/EventRepository";
import GetTicket from "../src/GetTicket";
import PurchaseTicket from "../src/PurchaseTicket";
import { RepositoryFactoryDatabase, RepositoryFactoryFake } from "../src/RepositoryFactory";
import { TicketRepositoryDatabase, TicketRepositoryFake } from "../src/TicketRepository";

test("Deve comprar um ingresso para o evento", async function () {
	const connection = new PgPromiseAdapter();
	// const repositoryFactory = new RepositoryFactoryDatabase(connection);
	const repositoryFactory = new RepositoryFactoryFake();
	const purchaseTicket = new PurchaseTicket(repositoryFactory);
	const getTicket = new GetTicket(repositoryFactory);
	const inputPurchaseTicket = {
		eventId: "185ff433-a7df-4dd6-ac86-44d219645cb1",
		email: "john.doe@gmail.com"
	}
	const outputPurchaseTicket = await purchaseTicket.execute(inputPurchaseTicket);
	expect(outputPurchaseTicket.ticketId).toBeDefined();
	const outputGetTicket = await getTicket.execute(outputPurchaseTicket.ticketId);
	expect(outputGetTicket.ticketId).toBe(outputPurchaseTicket.ticketId);
	expect(outputGetTicket.eventId).toBe(inputPurchaseTicket.eventId);
	expect(outputGetTicket.email).toBe(inputPurchaseTicket.email);
	expect(outputGetTicket.price).toBe(100);
	await connection.close();
});
