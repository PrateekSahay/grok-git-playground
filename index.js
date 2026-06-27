function parseSensorData(packet) {
  try {
    if (!packet) return null;

    if (packet.value === undefined || packet.value === null) {
      throw new Error('Missing sensor value');
    }

    const value = parseFloat(packet.value);
    if (Number.isNaN(value)) {
      throw new Error('Invalid sensor value: not a number');
    }

    return {
      id: packet.id ?? 'unknown',
      value,
      timestamp: Date.now()
    };
  } catch (err) {
    // Guardrail: log and return a safe fallback instead of crashing callers
    console.error('parseSensorData failed:', err.message);
    return {
      id: (packet && packet.id) || 'unknown',
      value: 0,
      timestamp: Date.now(),
      error: err.message
    };
  }
}

module.exports = { parseSensorData };
