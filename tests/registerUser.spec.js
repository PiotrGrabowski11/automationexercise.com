require('dotenv').config({ path: 'userData.env' });
const { test, expect } = require('@playwright/test');


test(`registerUser`, async ({ page }) => {

    const email = process.env.REGUSEREMAIL;
    const password = process.env.REGUSERPASSWORD;
    const emailInput = page.locator('.signup-form [name="email"]');
    const passwordInput = page.locator('#password');
    //Verify that home page is visible successfully
    await page.goto('baseURL');
    const response = await page.waitForResponse(response => response.status() === 200);
    expect(response.ok()).toBe(true);

    // Click on 'Signup / Login' button
    await page.locator('.fa-lock').click();

    // Verify 'New User Signup!' is visible
    await expect(page.locator('.signup-form')).toContainText('New User Signup!');

    // Enter name and email address
    await page.locator('.signup-form [name="name"]').fill('Test');
    await emailInput.fill(email);
    await page.locator('.signup-form [type="submit"]').click();

    //  Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect (page.locator('.title').first()).toContainText('Enter Account Information');

    //  Fill details: Title, Name, Email, Password, Date of birth
    await page.locator('#id_gender1').click();
    await page.locator('#name').fill('Piotr');
    await passwordInput.fill(password);
    await page.locator('#days').selectOption("10");
    await page.locator('#months').selectOption("May");
    await page.locator('#years').selectOption("1900");

    // Select checkbox 'Sign up for our newsletter!'
    await page.locator('#newsletter').click();

    // Select checkbox 'Receive special offers from our partners!'
    await page.locator('#optin').click();

    // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.locator('#first_name').fill('Piotr');
    await page.locator('#last_name').fill('Grabowski');
    await page.locator('#address1').fill('Testowa 5/5');
    await page.locator('#country').selectOption("Canada");
    await page.locator('#state').fill('Test');
    await page.locator('#city').fill('Testowo');
    await page.locator('#zipcode').fill('10-100');
    await page.locator('#mobile_number').fill('500900900');

    // Click 'Create Account button'
    await (page.locator('.btn').first()).click();

    // Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.locator('.title')).toContainText('Account Created!');

    // Click 'Continue' button  
    await page.locator('.pull-right .btn').click();

    // Verify that 'Logged in as username' is visible
    await expect (page.locator('li a').nth(9)).toContainText('Logged in as Piotr');

    // Click 'Delete Account' button
    await (page.locator('li a').nth(4)).click();

    // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.locator('.title')).toContainText('Account Deleted!');
    await page.locator('.pull-right .btn').click();
    await expect(page.url()).toBe('https://automationexercise.com/');
    

});
