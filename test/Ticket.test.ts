import Ticket from "../src/Ticket"

test("Deve criar um ingresso", async function () {
	const ticket = new Ticket("", "", "john.doe@gmail.com", 100);
	expect(ticket.getEmail()).toBe("john.doe@gmail.com");
	expect(ticket.price).toBe(100);
});

test("Não deve criar um ingresso com email inválido", async function () {
	expect(() => new Ticket("", "", "john.doe@", 100)).toThrow(new Error("Invalid email"));
});

test("Não deve criar um ingresso com preço inválido", async function () {
	expect(() => new Ticket("", "", "john.doe@gmail.com", -100)).toThrow(new Error("Invalid price"));
});
