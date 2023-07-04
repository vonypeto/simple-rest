import request from "supertest";
import app from "../../app";
import { Login } from "@controllers/accounts-controller/acccounts.controller";
import extractCredentials from "@src/utils/extract-credential";
import { connect, disconnect } from "@src/config/db.connection";

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
  describe("given a username and password", () => {
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

    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .post("/api/auth")
        .set("Authorization", "Basic dXNlckBtYWlsLmNvbToxMjM0cGFzcyE=")
        .send({});
      expect(response.status).toBe(200);
    });

    describe("without authorization bearer", () => {
      test("should respond with a 500 Internal status code", async () => {
        const response = await request(app).post("/api/auth");
        expect(response.status).toBe(500);
      });
    });
  });
});
