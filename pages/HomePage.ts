import { Page, expect, Locator } from '@playwright/test';

export class HomePage {

    private readonly page: Page;
    //Locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly txtSearchbox: Locator;
    private readonly btnSearch: Locator;


    //constructor
    constructor(page: Page) {
        this.page = page;

        //initialize locators
        this.lnkMyAccount = page.locator("span:has-text('My Account')");
        this.lnkRegister = page.locator('a:has-text("Register")');
        this.linkLogin = page.locator('a:has-text("Login")');
        this.txtSearchbox = page.locator('input[placeholder="Search"]');
        this.btnSearch = page.locator('.btn.btn-default.btn-lg');

    }


    //Action methods

    async isHomePageExists() {
        let title: string = await this.page.title();
        if (title) {
            return true;
        }
        return false;
    }

    //Click "My Account" link
    async clickMyAccount() {
    try {
        // Wait for the 'My Account' element to be visible before clicking
        await this.lnkMyAccount.waitFor({ state: 'visible', timeout: 10000 });
        await this.lnkMyAccount.click();
    } catch (error) {
        console.log(`Exception occurred while clicking 'My Account': ${error}`);
        throw error;
    }
}

    // Click "Register" link
    async clickRegister() {
        try {
            await this.lnkRegister.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Register': ${error}`);
            throw error;
        }
    }


    //Click "Login" link
    async clickLogin() {
        try {
            await this.linkLogin.click();
        } catch (error) {
            console.log(`Exception occured while clicking on 'Login:' ${error}`);
            throw error;
        }
    }

    //Enter product name in the search box

    async enterProductName(pName: string) {
        try {
            this.txtSearchbox.fill(pName);
        } catch (error) {
            console.log(`Exception occured while entering product name: ${error}`);
            throw error;
        }
    }

    //Click 'search button'

    async clickSearch() {
        try {
            await this.btnSearch.click();
        } catch (error) {
            console.log(`Exception occured while clicking the search button: ${error}`);
            throw error;
        }
    }



}