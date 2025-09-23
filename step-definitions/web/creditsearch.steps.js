const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { WebUrl } = require('../../config/env');

Given('I open the Hesap homepage', async function () {
    const { home } = this.po;
    await home.goto(WebUrl);
});

When('I close the opportunity pop-up on homepage', async function () {
    await this.po.home.opportunityClose();
});

When('I dismiss the cookie banner on homepage', async function () {
    await this.po.home.waitForCookieButton();
    await this.po.home.closeCookies();
});

When('I click the Individual Credit button from Credit Dropdown', async function () {
    await this.po.home.individualCreditBtn();
});

When('I fill the Value field which is {string}', async function (amount) {
    const normalized = String(amount).replace(/[^0-9]/g, '');
    await this.po.creditSearch.fillCreditField(normalized);
});

When('I select the {int} month Period from Period dropdown', async function (period) {
    await this.po.creditSearch.selectPeriodValue(period);
});

When("I click the Hesap'la button", async function () {
    await this.po.creditSearch.calculateBtn();
});

Then('I check the credit rate between 0 and 1.00', async function () {
    await this.po.creditSearch.checkFirstRate();
});