import { Page, Locator } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage'; // Import CheckoutPage if needed

export class ShoppingCartPage
{
    private readonly page: Page;

    //Locators

    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;

    //Constructor

    constructor(page:Page)
    {
        this.page = page;
        this.lblTotalPrice = page.locator("//*[@id='content']/div[2]/div/table//strong[text()='Total:']//following::td");
        this.btnCheckout = page.locator("a[class='btn btn-primary']");
    }

    //Action methods

    /*
    * Get the total price from the shopping cart
     * @returns Promise<string | null> - The total price text
     */

    async getTotalPrice():Promise<string | null>
    {
       try {
         return await this.lblTotalPrice.textContent();
       } catch (error) {
        console.log(`Unable to retrieve the Total Price: ${error}`);
        return null;
       }
    }

     /**
     * Click on the Checkout button
     * @returns Promise<CheckoutPage> - CheckoutPage instance
     */

     async clickOnCheckout():Promise<CheckoutPage>
     {
        await this.btnCheckout.click();
        return new CheckoutPage(this.page);
     }


     /**
     * Verify if shopping cart page is loaded
     * @returns Promise<boolean> - true if page is loaded
     */

     async isPageLoaded():Promise<boolean>
     {
        try {
        return await this.btnCheckout.isVisible();
        } catch (error) {
          console.log(`Exception occured while loading the page: ${error}`);
          return false;  
        }
        
     }

}