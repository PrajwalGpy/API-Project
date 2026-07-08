import { test, expect } from "@playwright/test";
import { loginUser } from "../api/auth.api";
import {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} from "../api/booking.api";
import { validUser } from "../test-data/users.json";
import { generateBookingPayload, randomString } from "../utility/faker";

test("completes booking CRUD flow and validates", async ({ request }) => {
  const loginResponse = await loginUser(
    request,
    validUser.username,
    validUser.password,
  );
  const token = loginResponse.data && loginResponse.data.token;

  const bookingPayload = generateBookingPayload();
  const createResponse = await createBooking(request, bookingPayload, token);

  expect(createResponse.status).toBe(200);
  expect(createResponse.data).toHaveProperty("bookingid");

  const bookingId = createResponse.data.bookingid;
  const fetchResponse = await getBooking(request, bookingId, token);

  expect(fetchResponse.status).toBe(200);
  expect(fetchResponse.data).toHaveProperty(
    "firstname",
    bookingPayload.firstname,
  );

  const updatedPayload = {
    ...bookingPayload,
    firstname: "Prajwal",
    lastname: "G P",
    additionalneeds: "Dinner",
  };

  const updateResponse = await updateBooking(
    request,
    bookingId,
    updatedPayload,
    token,
  );
  console.log(updateResponse.data)
  expect(updateResponse.status).toBe(200);
  expect(updateResponse.data.firstname).toBe("Prajwal");
});
