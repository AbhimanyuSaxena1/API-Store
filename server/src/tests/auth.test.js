import request from "supertest";
import { app } from "../app.js";
import User from "../models/user.model.js";
import { jest } from "@jest/globals";


const mockUser = {
  findOne: jest.fn(),
  create: jest.fn(),
};

jest.unstable_mockModule("../models/user.model.js", () => ({
  default: mockUser,
}));

describe("POST /api/v1/auth/register", () => {
  test("should return 400 when any field is missing", async () => {
    mockUser.findOne.mockResolvedValue(null);

    const res = await request(app).
      post("/api/v1/auth/register").
      send({
        name: "test",
        email: "test@gmail.com",
      });

    expect(res.status).toBe(400);

  })
})