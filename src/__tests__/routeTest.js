import "core-js/stable";
import "regenerator-runtime/runtime";
import request from "supertest";
import app from "../../app";

describe("test app routes", () => {
  it("should add user to database", async (done) => {
    const res = await request(app).post("/api/v1/user").send({
      name: "Abiola",
    });
    expect(res.body.message).toEqual("user created successfully");
    expect(res.status).toEqual(201);
    done();
  });
  it("should throw error without request body", async (done) => {
    const res = await request(app).post("/api/v1/user");
    expect(res.body.message).toEqual("Kindly provide name or email");
    expect(res.status).toEqual(400);
    done();
  });
  it("should credit all users", async (done) => {
    const res = await request(app).patch("/api/v1/credit");
    expect(res.body.message).toEqual("All accounts credited successfully");
    expect(res.status).toEqual(200);
    done();
  });
  it("should debit all users", async (done) => {
    const res = await request(app).patch("/api/v1/debit");
    expect(res.body.message).toEqual("All accounts debited successfully");
    expect(res.status).toEqual(200);
    done();
  });
  it("should debit all users", async (done) => {
    const res = await request(app).get("/api/v1/filter").send({
      name: "Abiola",
    });
    expect(res.body).toHaveProperty("data");
    expect(res.status).toEqual(200);
    done();
  });
  it("should not filter without request body", async (done) => {
    const res = await request(app).get("/api/v1/filter");
    expect(res.body.message).toEqual(
      "kindly provide name or balance to filter"
    );
    expect(res.status).toEqual(400);
    done();
  });
  it("should not withdraw without request body", async (done) => {
    const res = await request(app).patch("/api/v1/withdraw/1");
    expect(res.body.message).toEqual("kindly provide a valid id and amount");
    expect(res.status).toEqual(400);
    done();
  });
  it("should not withdraw money from an invalid account", async (done) => {
    const res = await request(app).patch("/api/v1/withdraw/2").send({
      amount: 1,
    });
    expect(res.body.message).toEqual("Account with id:2 not found");
    expect(res.status).toEqual(404);
    done();
  });
  it("should not withdraw money if balance is insufficient", async (done) => {
    const res = await request(app).patch("/api/v1/withdraw/1").send({
      amount: 2000000,
    });
    expect(res.body.message).toEqual("insufficient balance");
    expect(res.status).toEqual(400);
    done();
  });
});
