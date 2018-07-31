
This tweak signs with a 256 + 8 = 264 bit key.  It mimics [eosjs-ecc issue #16](https://github.com/EOSIO/eosjs-ecc/issues/16).  The goal is to recover an account owned by the coresponding public key.

This is a console script.

```
Fixed in eosjs-ecc v4.0.1  May 24, 2018 9d4e859
Fixed in eosjs     v12.0.2 May 24, 2018 (upgraded eosjs-ecc)

Bug appeared in: eosjs-ecc v4.0.0 and prior
```

Re-produce and tests follows:

* Click on clone or download on this Github page. Then download zip.
* Extract the zip file
* Open index.html in a modern browser
* Open the Web Inspector / Console to view the output (ctrl+shift+i)
* Inspect the source (ctrl+u)

