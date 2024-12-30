import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  // Check if the consent button is present (GDPR regions) and click it if it exists
  const consentButton = page.getByRole("button", { name: "Consent"});
  if (await consentButton.isVisible().catch(() => false)) {
    await consentButton.click();
    console.log("Consent button clicked.");
  } else {
    console.log("Consent button not found.");
  }

  await page.getByRole('link', { name: ' Products' }).click();
  const searchBar = page.getByPlaceholder('Search Product');
  await expect(searchBar).toBeVisible();  // Fixed visibility assertions
  const addBlueTopButton = page.locator('div.productinfo a[data-product-id="1"]')
  await addBlueTopButton.click()
  const modalHeading = page.getByRole("heading", { name: "Added!"});
  await expect(modalHeading).toBeVisible();  // Fixed visibility assertions
  await page.getByRole('button', { name: 'Continue Shopping' }).click(); // Changed 'link' to 'button' to match DOM
  await page.getByRole('link', { name: 'Cart'}).click();
  await page.getByText('Proceed To Checkout').click();
  const checkoutModalHeading = page.getByRole('heading', { name: 'Checkout' });
  await expect(checkoutModalHeading).toBeVisible(); // Added expect "Checkout" modal is visible before interacting with its elements
  await page.getByRole('link', { name: 'Register / Login'}).click();  // Changed 'Register / Signup' to 'Register / Login' to match DOM
  const signupHeading = page.getByRole('heading', { name: 'New User Signup!'});
  await expect(signupHeading).toBeVisible();  // Fixed visibility assertions
});