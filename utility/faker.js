function randomString(prefix = 'test') {
  return `${prefix}-${Date.now()}`;
}

function generateBookingPayload(overrides = {}) {
  const timestamp = Date.now();

  return {
    firstname: `Auto${timestamp}`,
    lastname: `User${timestamp}`,
    totalprice: 100 + (timestamp % 50),
    depositpaid: true,
    bookingdates: {
      checkin: '2026-08-01',
      checkout: '2026-08-05'
    },
    additionalneeds: 'Breakfast',
    ...overrides
  };
}

module.exports = { randomString, generateBookingPayload };
