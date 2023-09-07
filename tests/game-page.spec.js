const { test, expect } = require('@playwright/test');

const { SplashScreen } = require('./shared/screen-objects/splash.screen.js');
const { AdScreen } = require('./shared/screen-objects/ad.screen.js');
const { loadGamePage } = require('./shared/shared-steps.js');

test.describe('Game Page', () => {
  test('should load correctly', async ({ page }) => {
    await loadGamePage(page);

    const splashScreen = new SplashScreen(page);
    expect(await splashScreen.isVisible(), 'the splash screen should be visible').toBe(true);
  });

  test('should allow to start the game', async ({ page }) => {
    await loadGamePage(page);

    const splashScreen = new SplashScreen(page);
    await splashScreen.play();

    const adScreen = new AdScreen(page);
    expect(await adScreen.isVisible(), 'the ad screen should be visible').toBe(true);
  });
});

