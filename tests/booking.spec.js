import { test, expect, request } from "@playwright/test";

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
    console.log(bookingid);
  });

  test("Get Bppking  info", async ({ request }) => {
    const response = await request.get(
      "https://restful-booker.herokuapp.com/booking/" + bookingid,
    );
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(body.firstname).toBe("Prajwal");
  });
});
