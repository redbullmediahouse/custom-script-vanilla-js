# Red Bull Accounts Integration
You can use this feature to integrate Red Bull Accounts for Login purposes.
Usually this is used for Activations which need the user to be logged in and e.g. redeem codes.

## Tokens
Red Bull Accounts needs a token to work as expected. This is especially important for activations, so users are
assigned to the correct project in our Backend.

If you have a custom token for your project, you need to tell RB Accounts to use this token for signups and logins on the current page.

You can use this piece of code to set a token.
```
RBAccounts.setToken({application: '123456789'})
```
This is also part of the example code.

On every page change, the token is set to the redbull.com default token.

# Example
