const request = require("supertest");
const app = require("./../../src/app");
const conn = require("../../src/database/conn");

describe("ONG", () => {
  beforeEach(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "eita nozes",
        email: "apad@apad.com",
        whatsapp: "4791909909",
        city: "Rio do Sul",
        uf: "SC"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
