require('dotenv').config({ path: 'userData.env' });
const { test, expect } = require('@playwright/test');


test(`correctLogin`, async ({ page }) => {

    const emailUser = process.env.LOGINUSER;
    const passwordUser = process.env.LOGINPASSWORD;
    const emailUserInput = page.locator('.login-form [name="email"]');
    const userPasswordInput = page.locator('.login-form [name="password"]');
    
    //Verify that home page is visible successfully
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

    // Click 'Delete Account' button
    // This step is verified by registerUser.spec.js

    // Verify that 'ACCOUNT DELETED!' is visible
    // This step is verified by registerUser.spec.js

});
