/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

//just we need to declare 
let homePage: HomePage;
let registrationPage: RegistrationPage;
let config:TestConfig;


//beforeEach method
test.beforeEach(async ({ page }) => {

    //1) Navigate to application URL
    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(3000);

    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);

})

//afterEach method
test.afterEach(async ({ page }) => {
    await page.close();

})


//Main test
test("User registration test @master @sanity @regression", async ({ page }) => {


    //2) Go to 'My Account' and click 'Register'

    await homePage.clickMyAccount();
    await homePage.clickRegister();


    //3) Fill in registration details with random data


    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    // 4) Agree to Privacy Policy and submit the form

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    // 5) Validate the confirmation message

    const confirmationMsg = await registrationPage.getConfirmationMsg();

    expect(confirmationMsg).toContain("Your Account Has Been Created!")

    await page.waitForTimeout(3000);

})



