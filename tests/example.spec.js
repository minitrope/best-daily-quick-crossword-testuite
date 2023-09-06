const { test, expect } = require('@playwright/test');
const { delay, inSeconds, calendarMonth } = require('../utils.js');

const { GamePage } = require('../screen-objects/game.page.js')
const { SplashScreen } = require('../screen-objects/splash.screen.js')
const { AdScreen } = require('../screen-objects/ad.screen.js')
const { CalendarScreen } = require('../screen-objects/calendar.screen.js');
const { CrosswordScreen } = require('../screen-objects/crossword.screen.js');


const solution = {
  "across": [
    "cheats",
    "wisdom",
    "gorse",
    "descend",
    "antlers",
    "games",
    "completed",
    "anger",
    "seventy",
    "stained",
    "stain",
    "absurd",
    "racket"
  ],
  "down": [
    "cognac",
    "erratic",
    "theme",
    "insight",
    "dream",
    "modish",
    "disclosed",
    "mariner",
    "denmark",
    "nausea",
    "cygnet",
    "grass",
    "vista"
  ]
}

test('can start to play', async ({ page }) => {
  test.setTimeout(inSeconds(200));

  const gamePage = new GamePage(page);
  await gamePage.go();
  await gamePage.declineCookies();

  const splashScreen = new SplashScreen(page);
  await splashScreen.play();

  // await gamePage.pause();
  const adScreen = new AdScreen(page);
  // await adScreen.watch();
  await adScreen.skip();

  const gameFrame = gamePage.getGameFrame();

  let calendar = new CalendarScreen(gameFrame);
  let puzzleMonth = await calendar.getMonth();
  let currentMonth = calendarMonth(new Date().getMonth());
  expect(puzzleMonth).toEqual(currentMonth);
  calendar = await calendar.goToPreviousMonth();
  // calendar = calendar.goToNextMonth();

  // TODO: scroll to the day before
  await calendar.playDay("MON", "7");

  const crossword = new CrosswordScreen(gameFrame);
  
  expect(await crossword.getPuzzleInfo()).toContain('Daily Quick Crossword: 7 Aug 2023');

  let numberOfCluesAcross = await crossword.getNumberOfCluesAcross();
  expect(numberOfCluesAcross).toEqual(13);

  await crossword.toggleSkipOverFilledSquares();

  let i = 0;
  for (const clue of await crossword.getCluesAcross())
  {
    let tile = await crossword.findTile(await clue.getNumber());
    await tile.select("across");
    await tile.type(solution.across[i]);
    i += 1;
  }

  i = 0;
  for (const clue of await crossword.getCluesDown())
  {
    let tile = await crossword.findTile(await clue.getNumber());
    await tile.select("down");
    await tile.type(solution.down[i]);
    i += 1;
  }

  const results = await crossword.getResultsScreen();
  expect(results.getPopup()).toBeVisible();

  await delay(inSeconds(3));
});

