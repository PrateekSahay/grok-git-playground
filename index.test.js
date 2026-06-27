const { parseSensorData } = require('./index');

test('parses correct packet data', () => {
  const packet = { id: 'sensor-01', value: '23.5' };
  expect(parseSensorData(packet)).toEqual({
    id: 'sensor-01',
    value: 23.5,
    timestamp: expect.any(Number)
  });
});
