import { Page, Locator, expect } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage';


export class ProductPage
{
    private readonly page:Page;

    //Locator
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems:Locator;
    private readonly lnkViewCart: Locator;


    //constructor 

    constructor(page:Page)
    {
        this.page = page;
        this.txtQuantity = page.locator("#input-quantity");
        this.btnAddToCart = page.locator("#button-cart");
        this.cnfMsg = page.locator(".alert.alert-success.alert-dismissible");
        this.btnItems = page.locator("#cart");
        this.lnkViewCart = page.locator("strong:has-text('View Cart')");
    }


    /**
     * Sets the product quantity
     * @param qty - Quantity to set
     */

    async setQuantity(qty:string):Promise<void>
    {
        await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }

     /**
     * Adds product to cart
     */

     async addToCart():Promise<void>
     {
        await this.btnAddToCart.click();
     }


     /**
     * Checks if confirmation message is visible
     * @returns Promise<boolean> - Returns true if message is visible
     */

     async isConfirmationMessageVisible():Promise<boolean>
     {
        try {
            if(this.cnfMsg!=null)
            {
                return true;
            }
            else
            {
                return false;
            }
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
       
     }


     /**
     * Clicks on Items button to navigate to cart
     */

     async clickItemsToNavigateToCart():Promise<void>
     {
        await this.btnItems.click();
     }

     /**
     * Clicks on View Cart link
     * @returns Promise<ShoppingCartPage> - Returns ShoppingCartPage instance
     */

     async clickViewCart():Promise<ShoppingCartPage>
     {
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
     }






}

