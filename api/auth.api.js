const { sendRequest } = require("../utility/apiClients");

async function loginUser(requestContext, username, password) {
  return sendRequest(requestContext, "post", "/auth", { username, password });
}

module.exports = { loginUser };
