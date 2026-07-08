import { sendRequest } from "../utility/apiClients";

createBooking = async (requestContext, payload, token) => {
  return sendRequest(requestContext, "post", "/booking", payload, token);
};

async function getBooking(requestContext, id, token) {
  return sendRequest(requestContext, "get", `/booking/${id}`, null, token);
}

async function updateBooking(requestContext, id, payload, token) {
  return sendRequest(requestContext, "put", `/booking/${id}`, payload, token);
}

async function deleteBooking(requestContext, id, token) {
  return sendRequest(requestContext, "delete", `/booking/${id}`, null, token);
}

module.exports = { createBooking, getBooking, updateBooking, deleteBooking };
