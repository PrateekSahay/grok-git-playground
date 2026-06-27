function parseSensorData(packet, tracking = {}) {
  // Telemetry: start timing and resolve tracking context
  const start = process.hrtime.bigint();
  const requestId = tracking.requestId || 'anonymous';
  const source = tracking.source || 'unknown';

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

  // Prefer unary plus over parseFloat; hoist fields to locals (speed + memory)
  const id = packet.id;
  const value = +packet.value;
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
}

module.exports = { parseSensorData };
