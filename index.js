function parseSensorData(packet) {
  if (!packet) return null;
  return {
    id: packet.id,
    value: parseFloat(packet.value),
    timestamp: Date.now()
  };
}

module.exports = { parseSensorData };
