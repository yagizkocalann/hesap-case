const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I fill the deposit amount as {int}', async function (amount) {
  await this.po.homeDeposit.fillDepositAmount(amount);
});

When('I fill the deposit days as {int}', async function (days) {
  await this.po.homeDeposit.fillDepositDays(days);
});

When("I click the Homepage deposit Hesap'la button", async function () {
  await this.po.homeDeposit.clickDepositCalculate();
});

Then('I should see at least one deposit result', async function () {
  await this.po.homeDeposit.assertDepositResultsVisible();
});

When('I navigate to all deposit products from homepage', async function () {
  await this.po.homeDeposit.clickAllDepositProducts();
});

Then('I should be on the deposit listing page', async function () {
  await expect(this.page).toHaveURL(/\/mevduat/i);
});

When('I subscribe to the newsletter with email {string}', async function (email) {
  await this.po.homeDeposit.subscribeNewsletter(email, { acceptAll: true });
});

Then('I should see a successful newsletter subscription message', async function () {
  await this.po.homeDeposit.assertNewsletterSuccess();
});

When('I try to subscribe to the newsletter with email {string} without accepting consents', async function (email) {
  await this.po.homeDeposit.subscribeNewsletter(email, { acceptAll: false });
});

Then('I should see a newsletter validation error', async function () {
  await this.po.homeDeposit.assertNewsletterError();
});

