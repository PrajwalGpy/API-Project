import { test, expect } from "@playwright/test";
import { loginUser } from "../api/auth.api";
import {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} from "../api/booking.api";
import {validUser} from '../test-data/users.json'

test('completes booking CRUD flow and validates',async({request})=>{
  const loginResponse = await loginUser(request, validUser.username, validUser.password)
  const token = loginResponse.data && loginResponse.data.token
})