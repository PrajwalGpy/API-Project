async function sendRequest(requestContext, method, url, data, token) {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
        headers.Cookie = `token=${token}`;
    }

    const requestOptions = { headers };

    if (
        ["put", "post", "patch"].includes(method) &&
        data !== null &&
        data !== undefined
    ) {
        requestOptions.data = data;
    }

    const response = await requestContext[method](url, requestOptions);

    const body = await response.json().catch(() => null);

    return {
        status: response.status(),
        data: body,
        headers: response.headers(),
    };
}

export { sendRequest }




