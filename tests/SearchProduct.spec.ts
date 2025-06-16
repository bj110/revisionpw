
/**
 * Test Case: Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify if the product is displayed in the search results
 */

import{test,expect}from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';
import { ProductPage } from '../pages/ProductPage';

//Declare resuable variables
let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;

//Playwright hook - runs before each test

test.beforeEach(async({page})=>{

    config = new TestConfig();
    //step 1: Navigate to the app URL
    await page.goto(config.appUrl);

    //Initialize page objects

    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
});

//Playwright hook - runs after each test

test.afterEach(async ({page})=>{

    await page.close();

});


//Main test

test("Product search test @master @regression", async()=>{
const productName = config.productName; //local variable

//step 2 & 3: Enter product name and click Search

await homePage.enterProductName(productName);
await homePage.clickSearch();

//step 4: Verify if the product is displayed in the search results

expect(searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

//step 5: Validate if the searched product appears in results

const isProductFound= await searchResultsPage.isProductExist(productName);
expect(isProductFound).toBeTruthy();
});
