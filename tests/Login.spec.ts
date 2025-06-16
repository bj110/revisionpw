
/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage

test.beforeEach(async({page})=>{

    //1) Navigate to the application URL
    config = new TestConfig();//Load config(URL, credentials)
    await page.goto(config.appUrl);//navigate to base URL

    //initialize page objects

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);

});

test.afterEach(async({page})=>{

    await page.close();//close the browser tab
});

//Main test

test('User login test @master @sanity @regression', async()=> {

//2) Navigate to Login page via Home page

await homePage.clickMyAccount();
await homePage.clickLogin();

//3) Enter valid credentials and login 

await loginPage.setEmail(config.email);
await loginPage.setPassword(config.password);
await loginPage.clickLogin();

//alternately

//await loginPage.login(config.email, config.password);


//4) Verify successful login by checking 'My Account' page presence

 const isLoggedIn = await myAccountPage.isMyAccountPageExists();
 expect(isLoggedIn).toBeTruthy();

});