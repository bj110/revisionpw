import{Page, Locator} from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage{

    private readonly page:Page;

    //Locators

    private readonly msgHeading: Locator;
    private readonly lnkLogout: Locator;

    //constructor - initialize locators with CSS selectors

    constructor(page:Page)
    {
        this.page = page;
        this.msgHeading = page.locator("h2:has-text('My Account')");
        this.lnkLogout = page.locator("text='Logout'").nth(1);
    }


    //Action methods

    async isMyAccountPageExists():Promise<boolean>
    {
        try {
             const isVisible = await this.msgHeading.isVisible();
             return isVisible;
        } catch (error) {
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
        }
    }


    async clickLogout():Promise<LogoutPage>
    {
        try {
            await this.lnkLogout.click();
            return new LogoutPage(this.page);
        } catch (error) {
            console.log(`unable to click Logout link: ${error}`);
            throw error;
        }
    }

 /**
     * Alternative method to return page exists using title
     * @returns Promise<boolean> - Returns true if page title matches
     */
    async getPageTitle(): Promise<string> {
        return (this.page.title());
    }



}
