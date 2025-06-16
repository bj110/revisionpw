/**
 * Test Case: Add Product to Cart
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search box
 * 3. Click the search button
 * 4. Verify the product appears in the search results
 * 5. Select the product
 * 6. Set quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */

import{test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';
import { ProductPage } from '../pages/ProductPage';

//shared instances

let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

//Playwright hook - runs before each test

test.beforeEach(async({page})=>{

    config = new TestConfig();
    await page.goto(config.appUrl);//opens app url

    //initialize page objects

    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);   

});

//Playwright hook - runs after each test
test.afterEach(async({page})=>{

    await page.close();//optional cleanup

});


//Main test

test("Add product to cart test @master @regression", async({page})=>{

//step 2. Enter an existing product name in the search box
await homePage.enterProductName(config.productName);

//step 3. Click the search button
await homePage.clickSearch();

//step 4. Verify the product appears in the search results
expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

//step 5: Verify that the product exists in the results
const productName = config.productName;

expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

//step 6-7-8: Select product -> Set Quantity -> Add to cart -> Verify confirmation

if(await searchResultsPage.isProductExist(productName))
{
    await searchResultsPage.selectProduct(productName);
    await productPage.setQuantity(config.productQuantity);//set quantity;
    await productPage.addToCart();//add to cart
    expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
}

});



