const { Before, After } = require('@cucumber/cucumber');

Before(async function () {
  console.log('🎬 Scenario started');
  await this.launchBrowser();
  this.initPageObjects();

  const page = this.page;
  try {

    const isChromium = (process.env.BROWSER || 'chromium') === 'chromium';
    if (isChromium) {
      const session = await page.context().newCDPSession(page);
      const { windowId } = await session.send('Browser.getWindowForTarget');
      await session.send('Browser.setWindowBounds', {
        windowId,
        bounds: { windowState: 'maximized' }
      });
    }
  } catch (err) {
    console.warn('🔍 Fullscreen not supported in this browser:', err.message);
  }
});

After(async function () {
  console.log('✅ Scenario finished');
  await this.closeBrowser();
});