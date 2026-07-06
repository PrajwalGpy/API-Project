import { test, expect, request } from "@playwright/test";

test("Test login", async ({ request }) => {
 const response =  await request.post("https://restful-booker.herokuapp.com/auth", {
    headers: { "Content-Type": "application/json" },
    data: {
      username: "admin",
      password: "password123",
    },
  });

  expect(response.ok()).toBeTruthy()
  const body = await response.json()
  const token = body.token
  console.log(token)
});


