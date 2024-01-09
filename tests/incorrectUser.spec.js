const { test, expect } = require('@playwright/test');


test(`incorrectLogin`, async ({ page }) => {

const emailUserInput = page.locator('.login-form [name="email"]');
const userPasswordInput = page.locator('.login-form [name="password"]');
//  Launch browser
// Navigate to url 'http://automationexercise.com'
await page.goto('baseURL');

//  Verify that home page is visible successfully
const response = await page.waitForResponse(response => response.status() === 200);
expect(response.ok()).toBe(true);

// Click on 'Signup / Login' button
await page.locator('.fa-lock').click();

// Verify 'Login to your account' is visible
await expect(page.locator('.login-form')).toContainText('Login to your account');

// Enter incorrect email address and password
await emailUserInput.fill('email@mail.pl');
await userPasswordInput.fill('password123&^');

// Click 'login' button
await page.locator('.login-form [type="submit"]').click();

// Verify error 'Your email or password is incorrect!' is visible
await expect (page.locator('.login-form p')).toContainText('Your email or password is incorrect!');


});