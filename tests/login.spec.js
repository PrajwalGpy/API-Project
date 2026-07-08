import { test, expect, request } from "@playwright/test";
import { loginUser } from "../api/auth.api";
import { validUser } from "../test-data/users.json";

test("authenticates with valid credentials", async ({ request }) => {
  const loginUserResponse = await loginUser(
    request,
    validUser.username,
    validUser.password,
  );
  expect(loginUserResponse.status).toBe(200);
  expect(loginUserResponse.data).toHaveProperty("token");
});

test("returns a clear error for invalid credentials", async ({ request }) => {
  const loginUserResponse = await loginUser(
    request,
    "invalid",
    "validUser.password",
  );
  expect(loginUserResponse.status).toBe(200);
  expect(loginUserResponse.data).toHaveProperty("reason");
});
