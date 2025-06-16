import{Page, Locator} from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage{

private readonly page:Page;

//Locators
private readonly btnContinue: Locator;

//constructor

constructor(page:Page)
{
    this.page = page;
    this.btnContinue = page.locator(".btn.btn-primary");
}


//Action methods

async clickContinue():Promise<HomePage>
{
    await this.btnContinue.click();
    return new HomePage(this.page);
}


async isContinueButtonVisible():Promise<boolean>
{
    return await this.btnContinue.isVisible();
    
}

}