# Checkly Assessment Project

## 1st Playwright Test Changes:

- Lines 6-12, Added conditional handling for the consent button:
Updated the test to check if the consent button exists and click it only if present.
Used isVisible().catch(() => false) to handle scenarios where the button does not exist in non-GDPR regions.

- Lines 16, 20, 28, Fixed visibility assertions: Replaced expect(locator).toBeVisible with await expect(locator).toBeVisible() to correctly check visibility using Playwright's toBeVisible assertion.

- Line 21, Updated locator for "Continue Shopping": Replaced getByRole('link', { name: 'Continue Shopping' }) with getByRole('button', { name: 'Continue Shopping' }) to correctly locate the button element.

- Lines 24-25, Added modal visibility check for "Checkout": Included await expect(checkoutModalHeading).toBeVisible() to check that "Checkout" modal is visible before interacting with its elements.

- Line 26, Corrected locator for "Register / Signup": Updated getByRole('link', { name: 'Register / Signup' }) to getByRole('link', { name: 'Register / Login' }) to match the actual text of the link in the modal.

## 2nd Playwright Test Changes:

- Line 23, Fixed undefined URL issue: Corrected the retrieval of the Pokémon form URL by accessing the first element in the forms array (pokemonForm.forms[0].url) instead of pokemonForm.forms.url, which caused the pokemonFormURL to be undefined.

- Line 31, Corrected Pokémon type verification: Updated the assertion to retrieve the Pokémon type name (pokemonForm.types[0].type.name) to ensure the comparison checks against the correct value ('electric').
pokemonForm.types[0].type is the full object { "name": "electric", "url": "..." }.
pokemonForm.types[0].type.name accesses the "electric" string, which is the actual type you want.

## Dynamic API Check Generation:

The file `create-api.check.ts` contains a function that generates API checks for each URL in the json file users.json. When you deploy to Checkly, it will create the checks automatically. These checks won't pass until they have the auth token.
To allow these generated API checks to use the auth token, you will need to add this environment variable as a remote variable in Checkly. Specifically, this sensitive data will be stored as a secret in Checkly. According to the Checkly documentation:

"Secrets allow you to store sensitive data for use in checks. Once saved secrets are never shown in the UI or in logs. The secret value cannot be accessed via the CLI or API."

Since only the dynamically generated API checks need to access it, I'd recommend creating the remote variable at the group level, for the API check group. I've outlined the steps in my response to you. Documentation on Checkly secrets is found here: https://www.checklyhq.com/docs/browser-checks/variables/.

## Adding New Checks:

Any new `*.check.ts` checks created in your `__checks__` folder, and `*.spec.ts` checks created in your `__checks__/playwright-tests` folder, will be automatically picked up by the CLI when you deploy to Checkly. You can modify this functionality in the checkly.config.ts file.

In the `playwright-tests` folder, make sure you create browser checks in the `browser` folder and multi step checks in the `multistep` folder, for them to be picked up correctly by the CLI.

Right now, any new Playwright tests created will be added into the Playwright Group. If you would like them to not be added to any group, paste these lines into checkly.config.ts, within the `checks` object:

```
    browserChecks: {
      testMatch: '**/__checks__/playwright-tests/browser/*.spec.ts'
    },
    multiStepChecks: {
      testMatch: '**/__checks__/playwright-tests/multistep/*.spec.ts'
    },
```

and remove the browserChecks and multiStepChecks properties from the CheckGroup defined in playwright-group.check.ts.

## Project Structure

This project holds all checks within the `src/__checks__` folder, with Playwright tests living in the `src/__checks__/playwright-tests` folder.

- Running `npx checkly test` will look for `.check.ts` files and `.spec.ts` files in the `__checks__` and `__checks__/playwright` directories, respectively, and execute them in a dry run.

- Running `npx checkly deploy` will deploy your checks to Checkly, attach alert channels, and run them on a 10m schedule in the 
region `us-east-1` and `eu-west-1`.

## CLI Commands

Run the core CLI commands with `npx checkly <command>` 

| Command              | Action                                           |
|:---------------------|:-------------------------------------------------|
| `npx checkly test`   | Dry run all the checks in your project           |
| `npx checkly deploy` | Deploy your checks to the Checkly cloud          |
| `npx checkly login`  | Log in to your Checkly account                   |
| `npx checkly --help` | Show help for each command.                      |

[Check the docs for the full CLI reference](https://www.checklyhq.com/docs/cli/command-line-reference/).

## Adding and running `@playwright/test`

You can add `@playwright/test` to this project to get full code completion and run `.spec.ts` files for local debugging.
It's best to install the Playwright npm package version that matches your [Checkly runtime](https://www.checklyhq.com/docs/cli/npm-packages/).

```bash
npm install --save-dev @playwright/test@1.38.1
```

## Questions?

Check [our CLI docs](https://www.checklyhq.com/docs/cli/), the [main Checkly docs](https://checklyhq.com/docs) or 
join our [Slack community](https://checklyhq.com/slack).
