function parseSensorData(packet, tracking = {}) {
  const start = process.hrtime.bigint();
  const requestId = tracking.requestId || 'anonymous';
  const source = tracking.source || 'unknown';

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

  const result = {
    id: packet.id,
    value: parseFloat(packet.value),
    timestamp: Date.now()
  };

  const durationNs = Number(process.hrtime.bigint() - start);
  console.log(JSON.stringify({
    event: 'parseSensorData',
    status: 'ok',
    requestId,
    source,
    sensorId: result.id,
    durationNs,
    timestamp: result.timestamp
  }));

  return result;
}

module.exports = { parseSensorData };
