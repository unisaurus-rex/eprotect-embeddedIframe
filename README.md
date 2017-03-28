# eprotect-embeddedIframe
embedded iframe with mock api

## Test error classes
- enter numeric error class in account number field
- error classes to test: 871, 872, 874, 876, 881, 882

## Detect Empty Inputs
- structure of response

Three things must happen:
1) Call payframe.inputsEmpty
2) Define callback handler that accepts response message
  - add response format
3) Add callback handler to config object
