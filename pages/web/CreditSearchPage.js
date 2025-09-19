const { expect } = require('@playwright/test');
class CreditSearchPage {
    constructor(page) {
        this.page = page;
        this.creditField = page.getByTestId('consumer_loan_landing_page_loan_amount');
        this.periodDropdown = page.locator('[data-testid="consumer_loan_landing_page_loan_maturity"]');
        this.periodValue36 = page.getByRole('option', { name: '36' });
        this.calculateButton = page.getByRole('button', { name: "Hesap'la" });
    }

    async fillCreditField(creditValue) {
        await this.page.waitForTimeout(2000);
        await this.creditField.fill(creditValue);
    }

    async selectPeriodValue() {
        await this.periodDropdown.click();
        await this.periodValue36.click();
    }

    async calculateBtn() {
        await this.calculateButton.click();
        await this.page.waitForTimeout(3000);
    }

    async getErrorMessage() {
        await this.errorMessage.waitFor({ state: 'visible' });
        return await this.errorMessage.textContent();
    }

    async assertPageLoaded() {
        await expect(this.loginButton).toBeVisible();
        await expect(this.mobileNumberInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.submitButton).toBeVisible();
    }
}

module.exports = CreditSearchPage;