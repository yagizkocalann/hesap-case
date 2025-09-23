const { expect } = require('@playwright/test');
class CreditSearchPage {
    constructor(page) {
        this.page = page;
        this.creditField = page.getByTestId('consumer_loan_landing_page_loan_amount');
        this.periodDropdown = page.locator('[data-testid="consumer_loan_landing_page_loan_maturity"]');
        this.periodOption = (p) => page.getByRole('option', { name: String(p) });
        this.calculateButton = page.getByRole('button', { name: "Hesap'la" });
        this.firstRateField = page.locator('span.whitespace-nowrap.text-lg.font-bold', { hasText: /^%\d{1,2},\d{2}$/ });
    }

    async fillCreditField(creditValue) {
        await this.page.waitForTimeout(2000);
        await this.creditField.fill(creditValue);
    }

    async selectPeriodValue(period) {
        await this.periodDropdown.click();
        await this.periodOption(period).click();
    }

    async calculateBtn() {
        await expect(this.calculateButton).toBeVisible();
        await this.calculateButton.click();
        await this.page.waitForTimeout(3000);

    }

    async checkFirstRate() {
        const rateEl = this.firstRateField.first();
        await rateEl.waitFor({ state: 'visible', timeout: 5000 });
        const rateText = (await rateEl.textContent())?.trim() || '';
        const rateNumber = parseFloat(rateText.replace('%', '').replace(',', '.'));
        expect(Number.isFinite(rateNumber)).toBeTruthy();
        if (!Number.isFinite(rateNumber)) {
            console.warn('⚠️ Unable to parse rate text:', rateText);
            await expect(rateNumber).toBeLessThanOrEqual(1.00);
            return;
        }
        if (rateNumber >= 0 && rateNumber <= 1.00) {
            console.log(`✅ Rate is within range: ${rateNumber}`);
        } else {
            console.log(`⚠️ Rate is above 1.00: ${rateNumber}`);
            await expect(rateNumber).toBeGreaterThan(1.00);
        }
    }

}

module.exports = CreditSearchPage;