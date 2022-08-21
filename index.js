const range = (x, y) => Array.from({ length: y }, (_, i) => i + x)
const lookUp = new Uint8Array([
  ...Array(43).fill(0), 62, 0, 62, 0, 63,
  ...range(52, 10), 0, 0, 0, 64, 0, 0, 0,
  ...range(0, 26), 0, 0, 0, 0, 63, 0,
  ...range(26, 26)
])

export default function base64Decode (source, target) {
  let tmp
  let i = 0
  let byteIndex = 0

  const sourceLength = source.length
  const paddingLength = source[sourceLength - 2] === '=' ? 2 : source[sourceLength - 1] === '=' ? 1 : 0
  const table = lookUp
  const baseLength = (sourceLength - paddingLength) & 0xfffffffc
  const code = source.charCodeAt.bind(source)

  for (; i < baseLength; i += 4) {
    tmp =
      (table[code(i)] << 18) |
      (table[code(i + 1)] << 12) |
      (table[code(i + 2)] << 6) |
      (table[code(i + 3)])

    target[byteIndex++] = (tmp >> 16) & 0xFF
    target[byteIndex++] = (tmp >> 8) & 0xFF
    target[byteIndex++] = (tmp) & 0xFF
  }

  if (paddingLength === 1) {
    tmp =
      (table[code(i)] << 10) |
      (table[code(i + 1)] << 4) |
      (table[code(i + 2)] >> 2)

    target[byteIndex++] = (tmp >> 8) & 0xFF
    target[byteIndex++] = tmp & 0xFF
  }

  if (paddingLength === 2) {
    tmp =
      (table[code(i)] << 2) |
      (table[code(i + 1)] >> 4)

    target[byteIndex++] = tmp & 0xFF
  }
}
