# eprotect-embeddedIframe
This project displays a sample form containing an embedded iframe. Any calls to the back end server have been mocked. This project can be used for testing the behavior of getPaypageRegistrationId and allInputsEmpty functions in ```payframe-client.js```

## Test error classes
Test the behavior of the page if an error class is returned after calling ```LitlePayframeClient.getPaypageRegistrationId()```

Entering one of the following numeric codes in the Account Number field will cause the corresponding error class to be added to the form (ie. entering '871' will cause the ```error-871``` class to be added to the form).
- 871
- 872
- 874
- 876
- 881
- 882

## Detect Empty Inputs
You may query the iframe to determine if the inputs are empty. For this to work, three things must happen

1) Call ```LitlePayframeClient.allInputsEmpty()```
2) Define a callback handler that accepts a response message with the following format:
```
{
  allInputsEmpty: true || false
}
```
3) Add the callback handler to the config object passed to ```LitlePayframeClient```

See ```js/app.js``` for an example. Currently the emptyInputs response is logged to the console.
