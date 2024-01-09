require('dotenv').config({ path: 'userData.env' });
const { test, expect } = require('@playwright/test');


test(`logoutUser`, async ({ page }) => {

    const emailUser = process.env.LOGINUSER;
    const passwordUser = process.env.LOGINPASSWORD;
    const emailUserInput = page.locator('.login-form [name="email"]');
    const userPasswordInput = page.locator('.login-form [name="password"]');
    
    // Launch browser
    // Navigate to url 'http://automationexercise.com'
    // Verify that home page is visible successfully
    await page.goto('baseURL');
    const response = await page.waitForResponse(response => response.status() === 200);
    expect(response.ok()).toBe(true);

    // Click on 'Signup / Login' button
    await page.locator('.fa-lock').click();

    // Verify 'Login to your account' is visible
    await expect(page.locator('.login-form')).toContainText('Login to your account');

    // Enter correct email address and password
    await emailUserInput.fill(emailUser);
    await userPasswordInput.fill(passwordUser);

    // Click 'login' button
    await page.locator('.login-form [type="submit"]').click();

    // Verify that 'Logged in as username' is visible
    await expect (page.locator('li a').nth(9)).toContainText('Logged in as Piotr');

    //Click 'Logout' button
    await (page.locator('li a').nth(3)).click();

    // Verify that user is navigated to login page
    await expect(page.url()).toBe('https://automationexercise.com/login');
    await expect(page.locator('.login-form')).toContainText('Login to your account');


});
