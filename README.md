
This tweak signs with a 256 + 8 = 264 bit key.  It mimics
[eosjs-ecc issue #16](https://github.com/EOSIO/eosjs-ecc/issues/16).  The goal
is to recover an account by changing out the unintended public key with the
intended public key.

This issue was most likely to have appeared during the Claim Key registration
phase prior to the launch of EOS.

Status:
Used to recover 4 production accounts and 1 testnet account (all recovery
attempts have worked).

This is a console program you can download, modify (see index.html), and run.

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
