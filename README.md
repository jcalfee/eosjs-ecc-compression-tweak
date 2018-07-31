
This tweak signs with a 256 + 8 = 264 bit key.  It mimics
[eosjs-ecc issue #16](https://github.com/EOSIO/eosjs-ecc/issues/16).  The goal
is to recover an account by changing out the unintended public key with the
intended public key.

This issue was most likely to have appeared during the Claim Key registration
phase prior to the launch of EOS.

Status:

A signature is generated but it is rejected by the testnet:
> "code":3090003,"name":"unsatisfied_authorization","what":"Provided keys, permissions, and delays do not satisfy declared authorizations"

Using eosjs-ecc, the signature recovered unintended public:
```js
// Depends on eosjs-ecc custom build: https://github.com/EOSIO/eosjs-ecc/pull/22
sig = ecc.sign('', unintendedPrivate)
sigPublic = ecc.recover(sig, '')
const match = sigPublic === unintendedPublic.toString()
assert(match)
```

This is a console script.

```
Fixed in eosjs-ecc v4.0.1  May 24, 2018 9d4e859
Fixed in eosjs     v12.0.2 May 24, 2018 (upgraded eosjs-ecc)

Bug appeared in: eosjs-ecc v4.0.0 and prior
```

Reproduce and tests follows:

* Click on clone or download on this Github page. Then download zip.
* Extract the zip file
* Open index.html in a modern browser
* Open the Web Inspector / Console to view the output (ctrl+shift+i)
* Inspect the source (ctrl+u)
