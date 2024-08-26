import DatabaseConnection from "./DatabaseConnection";
import Event from "./Event";

export default interface EventRepository {
	getEvent (eventId: string): Promise<Event>;
}

export class EventRepositoryDatabase implements EventRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async getEvent (eventId: string): Promise<Event> {
		const [eventData] = await this.connection.query("select * from branas.event where event_id = $1", [eventId]);
		return new Event(eventData.event_id, eventData.description, parseFloat(eventData.price));
	}
}

export class EventRepositoryFake implements EventRepository {

	async getEvent(eventId: string): Promise<Event> {
		return new Event("185ff433-a7df-4dd6-ac86-44d219645cb1", "A", 100);
	}

}