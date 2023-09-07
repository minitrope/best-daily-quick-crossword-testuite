const { test, expect } = require('@playwright/test');
const { delay, inSeconds, dayOfTheWeek, calendarMonth } = require('./shared/utils.js');

const { CalendarScreen } = require('./shared/screen-objects/calendar.screen.js');
const { CrosswordScreen } = require('./shared/screen-objects/crossword.screen.js');
const { loadGame } = require('./shared/shared-steps.js');

const { config, sept7Solution } = require('./shared/test-data.js');

test.describe('Crossword Game', () => {
  test('Should display the current day', async ({ page }) => {
    test.setTimeout(inSeconds(90));
    let today = new Date();
    let weekday = dayOfTheWeek(today);
    let monthday = today.getDate();
    let month = calendarMonth(today.getMonth());

    let gameFrame = await loadGame(page);
    let calendar = new CalendarScreen(gameFrame);
    await calendar.playDay(weekday, monthday);

    const crossword = new CrosswordScreen(gameFrame);
    expect(await crossword.getPuzzleInfo())
      .toContain('Daily Quick Crossword: ' + monthday + ' ' + month);
  });

  test('Can be completed', async ({ page }) => {
    test.setTimeout(inSeconds(180));
    
    let gameFrame = await loadGame(page);
    let calendar = new CalendarScreen(gameFrame);
    await calendar.playDay('WED', 6);

    const crossword = new CrosswordScreen(gameFrame);
    await crossword.toggleSkipOverFilledSquares();

    let i = 0;
    for (const clue of await crossword.getCluesAcross()) {
      let tile = await crossword.findTile(await clue.getNumber());
      await tile.select("across");
      await tile.type(sept7Solution.across[i]);
      i += 1;
    }

    i = 0;
    for (const clue of await crossword.getCluesDown()) {
      let tile = await crossword.findTile(await clue.getNumber());
      await tile.select("down");
      await tile.type(sept7Solution.down[i]);
      i += 1;
    }

    await page.pause();

    const results = crossword.getResultsScreen();
    await expect(results.getPopup()).toBeVisible();

    await delay(inSeconds(1));
    await page.screenshot({ path: config.screenshotsDir + 'completed.png' });
  });
});
