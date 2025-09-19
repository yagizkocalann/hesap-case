const { expect } = require('@playwright/test');
const { WebUrl } = require('../../config/env');

class HomePage {
  constructor(page) {
    if (!page) {
      throw new Error('A valid page instance must be provided to HomePage');
    }
    this.page = page;
    this.opportunityCloseButton = this.page.locator('#dengage_push-refuse-button');
    this.cookieCloseButton = this.page.getByRole('button', { name: 'Tümünü Kabul Et' });

    this.individualCreditButton = this.page.getByTestId('homepage_header_container').getByRole('link', { name: 'İhtiyaç kredisi' });
    //this.individualCreditButton = page.locator('a[href="/kredi/ihtiyac-kredisi"]');


    this.marketsNavLink = this.page.getByRole('link', { name: /Piyasalar/ });
  }

  async goto() {
    await this.page.goto(WebUrl, { waitUntil: 'domcontentloaded' });
    await this.assertPageLoaded();
  }

  async opportunityClose() {
    try {
      const btn = this.opportunityCloseButton;
      if (await btn.count() === 0) return false;

      if (await btn.isVisible()) {
        await btn.click({ timeout: 1000 }).catch(() => { });
        return true;
      }
    } catch (error) {
      console.warn('Opportunity close button interaction skipped:', error?.message);
    }
    return false;
  }

  async waitForCookieButton() {
    await this.cookieCloseButton.waitFor({ state: 'visible', timeout: 5000 });
  }

  async individualCreditBtn() {
    await this.individualCreditButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.individualCreditButton.click();
  }

  async closeCookies() {
    try {
      await this.cookieCloseButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.cookieCloseButton.click();
    } catch (error) {
      console.warn('Cookie close button not found or not visible within timeout.');
    }
  }



  async navigateToMarketsPage() {
    await this.marketsNavLink.click();
    await this.page.waitForURL(/\/markets/, { timeout: 10000 });
  }

  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/hesap\.com/);
    await expect(this.cookieCloseButton).toBeVisible();
  }
}

module.exports = HomePage;