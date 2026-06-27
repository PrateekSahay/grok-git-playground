function parseSensorData(packet, tracking = {}) {
  // Telemetry: start timing and resolve tracking context
  const start = process.hrtime.bigint();
  const requestId = tracking.requestId || 'anonymous';
  const source = tracking.source || 'unknown';

  try {
    // Fast path: reject falsy without allocating a result object
    if (!packet) {
      const durationNs = Number(process.hrtime.bigint() - start);
      console.log(JSON.stringify({
        event: 'parseSensorData',
        status: 'empty_packet',
        requestId,
        source,
        durationNs,
        timestamp: Date.now()
      }));
      return null;
    }

    if (packet.value === undefined || packet.value === null) {
      throw new Error('Missing sensor value');
    }

    // Prefer unary plus over parseFloat; hoist fields to locals (speed + memory)
    const id = packet.id ?? 'unknown';
    const value = +packet.value;
    if (Number.isNaN(value)) {
      throw new Error('Invalid sensor value: not a number');
    }
    const timestamp = Date.now();
    const result = { id, value, timestamp };

    const durationNs = Number(process.hrtime.bigint() - start);
    console.log(JSON.stringify({
      event: 'parseSensorData',
      status: 'ok',
      requestId,
      source,
      sensorId: id,
      durationNs,
      timestamp
    }));

    return result;
  } catch (err) {
    // Guardrail: log and return a safe fallback instead of crashing callers
    const durationNs = Number(process.hrtime.bigint() - start);
    console.error('parseSensorData failed:', err.message);
    console.log(JSON.stringify({
      event: 'parseSensorData',
      status: 'error',
      requestId,
      source,
      error: err.message,
      durationNs,
      timestamp: Date.now()
    }));
    return {
      id: (packet && packet.id) || 'unknown',
      value: 0,
      timestamp: Date.now(),
      error: err.message
    };
  }
}

module.exports = { parseSensorData };
