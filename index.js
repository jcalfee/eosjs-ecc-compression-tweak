
const bs58 = require('bs58')
const BigInteger = require('bigi')

/**
  Ordinarily the 33rd byte 0x01 would be removed, due to this bug some
  invalid private / public key pairs were generated and given to users. This
  tweak allows that invalid private key to be used by converting it to a
  format (BitInteger) that can be passed into eosjs or eosjs-ecc and used
  to sign transactions.

  It is not possible to create a better private / public key pair, the
  over-sized key must be used as a tweak.  So user's affected should use this
  tweak to update their account with new keys.

  @see https://github.com/EOSIO/eosjs-ecc/issues/16
*/
function privateBigIntegerCompressionTweak(wif) {
  const buffer = Buffer.from(bs58.decode(wif))
  // const checksum = buffer.slice(-4)
  const versionKey = buffer.slice(0, -4)
  const version = versionKey.readUInt8(0);
  if(0x80 !== version) {
    throw new Error(`Expected version ${0x80}, instead got ${version}`)
  }
  const buf = versionKey.slice(1)
  if(buf.length !== 33 || buf[32] !== 1) {
    throw new Error('This tweak requires a compressed private key.')
  }
  // Ordinarily the 33rd byte 0x01 would be removed, due to this bug some
  return BigInteger.fromBuffer(buf)
}

module.exports = privateBigIntegerCompressionTweak
