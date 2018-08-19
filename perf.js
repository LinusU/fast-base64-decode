const crypto = require('crypto')
const base64Decode = require('./')

{
  // Warmup
  const target = new Uint8Array(1024 * 1024)
  const data = crypto.randomBytes(1024 * 1024)
  const encoded = data.toString('base64')
  const iterations = 100

  for (let i = 0; i < iterations; i++) base64Decode(encoded, target)
}

{
  const target = new Uint8Array(32 * 1024 * 1024)
  const data = crypto.randomBytes(32 * 1024 * 1024)
  const encoded = data.toString('base64')
  const iterations = 10

  console.time('decode 32MB x10')
  for (let i = 0; i < iterations; i++) base64Decode(encoded, target)
  console.timeEnd('decode 32MB x10')
}

{
  const target = new Uint8Array(32)
  const data = crypto.randomBytes(32)
  const encoded = data.toString('base64')
  const iterations = 10 * 1024 * 1024

  console.time(`decode 32B x10M`)
  for (let i = 0; i < iterations; i++) base64Decode(encoded, target)
  console.timeEnd(`decode 32B x10M`)
}
