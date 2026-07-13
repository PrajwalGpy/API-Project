import { test, expect, request } from "@playwright/test";
import { AsyncLocalStorage } from "node:async_hooks";

let authToken;
let bookingid;
test.describe.configure({ mode: "serial" });

test.describe("Authenticated API Tests", () => {
  test.beforeAll(async ({ request }) => {
    const response = await request.post(
      "https://restful-booker.herokuapp.com/auth",
      {
        headers: { "Content-Type": "application/json" },
        data: {
          username: "admin",
          password: "password123",
        },
      },
    );

    const body = await response.json();
    authToken = body.token;
  });

  test("Creaate Booking info", async ({ request }) => {
    const response = await request.post(
      "https://restful-booker.herokuapp.com/booking",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstname: "Prajwal",
          lastname: "G P",
          totalprice: 300,
          depositpaid: true,
          bookingdates: {
            checkin: "2026-01-01",
            checkout: "2026-02-01",
          },
          additionalneeds: "Breakfast",
        },
      },
    );

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    bookingid = data.bookingid;
  });

  test("Get Bppking  info", async ({ request }) => {
    const response = await request.get(
      "https://restful-booker.herokuapp.com/booking/" + bookingid,
    );
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(body.firstname).toBe("Prajwal");
    expect(response.status()).toBe(200);
  });

  test("Update the booking info", async ({ request }) => {
    const response = await request.put(
      "https://restful-booker.herokuapp.com/booking/" + bookingid,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${authToken}`,
        },
        data: {
          firstname: "Prajwal ",
          lastname: "Poojary",
          totalprice: 500,
          depositpaid: false,
          bookingdates: {
            checkin: "2026-05-01",
            checkout: "2026-06-01",
          },
          additionalneeds: "Breakfast,wifi",
        },
      },
    );
    const body = await response.json();
    expect(response.status()).toBe(200);
  });

  test("PartialUpdateBooking", async ({ request }) => {
    const response = await request.patch(
      "https://restful-booker.herokuapp.com/booking/" + bookingid,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${authToken}`,
        },
        data: {
          firstname: "PRAJWAL",
          totalprice: 700,
        },
      },
    );
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test("DeleteBooking", async ({ request }) => {
    const response = await request.delete(
      "https://restful-booker.herokuapp.com/booking/" + bookingid,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${authToken}`,
        },
      },
    );
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(201)
  });
});
