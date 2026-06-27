function parseSensorData(packet) {
  // Fast path: reject falsy without allocating
  if (!packet) return null;

  // Prefer unary plus over parseFloat (faster for numeric strings)
  // Build result in a single allocation; avoid intermediate temps
  const id = packet.id;
  const value = +packet.value;
  const timestamp = Date.now();

  return { id, value, timestamp };
}

module.exports = { parseSensorData };
