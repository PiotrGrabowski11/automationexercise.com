require('dotenv').config({ path: 'userData.env' });
const { test, expect } = require('@playwright/test');


test(`regUserExistingEmail`, async ({ page }) => {

    const email = process.env.LOGINUSER;
    const emailInput = page.locator('.signup-form [name="email"]');

    
    // Launch browser
    // Navigate to url 'http://automationexercise.com'
    // Verify that home page is visible successfully
    await page.goto('baseURL');
    const response = await page.waitForResponse(response => response.status() === 200);
    expect(response.ok()).toBe(true);

    // Click on 'Signup / Login' button
    await page.locator('.fa-lock').click();

    // Verify 'New User Signup!' is visible
    await expect(page.locator('.signup-form')).toContainText('New User Signup!');

    // Enter name and already registered email address
    await page.locator('.signup-form [name="name"]').fill('Test');
    await emailInput.fill(email);

    // Click 'Signup' button
    await page.locator('.signup-form [type="submit"]').click();

    // Verify error 'Email Address already exist!' is visible
    await expect(page.locator('.signup-form p')).toContainText('Email Address already exist!');


});
