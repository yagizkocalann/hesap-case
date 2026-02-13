const { expect } = require('@playwright/test');

class HomeDepositWidgetPage {
  constructor(page) {
    if (!page) {
      throw new Error('A valid page instance must be provided to HomeDepositWidgetPage');
    }

    this.page = page;

    // Deposit / hesaplama widget
    this.depositAmountInput = this.page.getByRole('textbox', { name: /ana para/i });
    this.depositDayInput = this.page.getByRole('spinbutton', { name: /vade.*gün/i });
    this.depositCalculateButton = this.page.getByRole('button', { name: "Hesap'la" });
    this.depositResultRow = this.page.locator('[data-testid="deposit_result_row"]'); // örnek, gerçek testid ile güncelle
    this.allDepositProductsLink = this.page.getByRole('link', { name: /tüm mevduat ürünleri/i });

    // Newsletter form
    this.newsletterEmailInput = this.page.getByRole('textbox', { name: /e-posta|email/i });
    this.checkboxInfo = this.page.getByLabel(/aydınlatma metni/i);
    this.checkboxConsent = this.page.getByLabel(/açık rıza metni/i);
    this.checkboxContact = this.page.getByLabel(/iletişim izni/i);
    this.newsletterSubmitButton = this.page.getByRole('button', { name: /kayıt ol/i });
    this.newsletterSuccessMessage = this.page.getByText(/teşekkürler|başarıyla kaydedildi/i);
    this.newsletterErrorMessage = this.page.getByText(/lütfen.*onaylayın|geçerli bir e-posta/i);
  }

  // Deposit widget actions

  async fillDepositAmount(amount) {
    await this.depositAmountInput.fill(String(amount));
  }

  async fillDepositDays(days) {
    await this.depositDayInput.fill(String(days));
  }

  async clickDepositCalculate() {
    await expect(this.depositCalculateButton).toBeVisible();
    await this.depositCalculateButton.click();
  }

  async assertDepositResultsVisible() {
    await expect(this.depositResultRow.first()).toBeVisible();
  }

  async clickAllDepositProducts() {
    await this.allDepositProductsLink.click();
    await this.page.waitForURL(/\/mevduat/i, { timeout: 10000 });
  }

  // Newsletter actions

  async subscribeNewsletter(email, { acceptAll = true } = {}) {
    await this.newsletterEmailInput.fill(email);

    if (acceptAll) {
      await this.checkboxInfo.check();
      await this.checkboxConsent.check();
      await this.checkboxContact.check();
    }

    await this.newsletterSubmitButton.click();
  }

  async assertNewsletterSuccess() {
    await expect(this.newsletterSuccessMessage).toBeVisible();
  }

  async assertNewsletterError() {
    await expect(this.newsletterErrorMessage).toBeVisible();
  }
}

module.exports = HomeDepositWidgetPage;

