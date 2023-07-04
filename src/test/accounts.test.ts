import request from "supertest";
import app from "../../app";
import { connect, disconnect } from "@src/config/db.connection";
import { deleteUserByEmail } from "@src/helper/account-db";

beforeAll(async () => {
  await connect(); // Wait for the database connection to be established
});

afterAll(async () => {
  await disconnect(); // Close the database connection after all tests
});
let consoleLogSpy: jest.SpyInstance;

beforeEach(() => {
  consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
});
describe("POST /api/auth", () => {
  describe("Login given a username and password", () => {
    test("should respond with a 200 status code and return token", async () => {
      const response = await request(app)
        .post("/api/auth")
        .set("Authorization", "Basic dXNlckBtYWlsLmNvbToxMjM0cGFzcyE=")
        .send({});

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.startsWith("eyJ")).toBe(true);
    });
    test("should respond with a 500 Internal status code without authorization bearer", async () => {
      const response = await request(app).post("/api/auth");
      expect(response.status).toBe(500);
    });
  });
});

describe("POST /api/register", () => {
  describe("Register given a username and password", () => {
    test("should respond with a 200 status code and return token", async () => {
      const response = await request(app)
        .post("/api/register")
        .set("Authorization", "Basic dm9ueXBldEBtYWlsLmNvbToxMjM0cGFzcyE=")
        .send({});

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.startsWith("eyJ")).toBe(true);
    });
    test("should respond with a 409 status code if user already exists", async () => {
      const response = await request(app)
        .post("/api/register")
        .set("Authorization", "Basic dm9ueXBldEBtYWlsLmNvbToxMjM0cGFzcyE=")
        .send({});

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("User already exists");
    });
  });

  // Tear down
  afterAll(async () => {
    await deleteUserByEmail("vonypet@mail.com");
  });
});
