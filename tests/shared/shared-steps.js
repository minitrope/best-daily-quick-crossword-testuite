const { GamePage } = require('./screen-objects/game.page.js')
const { SplashScreen } = require('./screen-objects/splash.screen.js')
const { AdScreen } = require('./screen-objects/ad.screen.js')

const { config } = require('./test-data.js');

async function loadGamePage(page) {
  page.setViewportSize({ width: config.resolution.w, height: config.resolution.h });
  const gamePage = new GamePage(page);
  await gamePage.go();

  if (await gamePage.hasGDPRPopup())
  {
    await gamePage.declineCookies();
  }
  return gamePage;
}

async function loadGame(page) {
  let gamePage = await loadGamePage(page);
  const splashScreen = new SplashScreen(page);
  await splashScreen.play();

  const adScreen = new AdScreen(page);
  await adScreen.isVisible();
  await adScreen.watch();

  return gamePage.getGameFrame();
}

exports.loadGamePage = loadGamePage;
exports.loadGame = loadGame;