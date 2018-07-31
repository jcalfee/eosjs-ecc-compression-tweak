
const bs58 = require('bs58')
const BigInteger = require('bigi')
const crypto = require('crypto')

/**
  The following is a test that works with eosjs-ecc (and eosjs).

  It is not possible to create a better private / public key pair on EOS.
  Instead, recover the account by replacing the unintended public key
  with the intended public key.  Tools like cleos will not work until
  the account is recovered.

Using this tweak with eosjs-ecc:
@example ```js
Eos.modules.ecc.PrivateKey(privateCompressionTweak(wif)).toPublic().toString()
"EOS6ig7VSsHLtt8BDkVV39HYAQsdNUwwhY1SPJBUBEA4NK8Zpkz2y"
```

Using this tweak in eosjs:
@example ```html
<html><head>

<script src="./eos.min.js"></script>
<script src="./index.js"></script>

<script>
wif = 'L5TCkLizyYqjvKSy6jg1XM3Lc4uTDwwvHS2BYatyXSyoS8T5kC2z'
keyProvider = privateCompressionTweak(wif)
eos = Eos({keyProvider, httpEndpoint: 'https://mainnet.libertyblock.io:7777'})
</script>

<!-- ... -->

</head></html>
```
*/
function privateCompressionTweak(wif) {
  const buffer = Buffer.from(bs58.decode(wif))

  const checksum = buffer.slice(-4)
  const versionKey = buffer.slice(0, -4)

  const sha256 = data => crypto.createHash('sha256').update(data).digest()
  const newCheck = sha256(sha256(versionKey)).slice(0, 4)

  if (checksum.toString() !== newCheck.toString()) {
    throw new Error('Invalid checksum, ' +
      `${checksum.toString('hex')} != ${newCheck.toString('hex')}`
    )
  }

  const version = versionKey.readUInt8(0);
  if(0x80 !== version) {
    throw new Error(`Expected version ${0x80}, instead got ${version}`)
  }

  const key = versionKey.slice(1)
  if(key.length !== 33 || key[32] !== 1) {
    throw new Error('This tweak requires a compressed private key.')
  }

  // Ordinarily the 33rd byte 0x01 would be removed, due to this bug
  // key[32] is kept and passed to BigInteger.fromBuffer

  // The PrivateKey constructor accepts the BigInteger directly if its 1st arg
  // `d` passes this test: `typeof d === 'object' && BigInteger.isBigInteger(d.d)`
  return {d: BigInteger.fromBuffer(key)}
}

module.exports = privateCompressionTweak
