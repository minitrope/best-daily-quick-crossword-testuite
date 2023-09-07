const { test, expect } = require('@playwright/test');
const { inSeconds, calendarMonth } = require('./shared/utils.js');

const { CalendarScreen } = require('./shared/screen-objects/calendar.screen.js');
const { loadGame } = require('./shared/shared-steps.js');

test.describe('Game Calendar', () => {
  test('Should display the current month', async ({ page }) => {
    test.setTimeout(inSeconds(90));

    let gameFrame = await loadGame(page);
    let currentMonth = calendarMonth(new Date().getMonth());

    let calendar = new CalendarScreen(gameFrame);
    let puzzleMonth = await calendar.getMonth();
    expect(puzzleMonth).toEqual(currentMonth);
  });

  test('Should allow to navigate to the previous month', async ({ page }) => {
    test.setTimeout(inSeconds(90));

    let gameFrame = await loadGame(page);
    let previousMonth = calendarMonth(new Date().getMonth() - 1);

    let calendar = new CalendarScreen(gameFrame);
    calendar = await calendar.goToPreviousMonth();
    let puzzleMonth = await calendar.getMonth();
    expect(puzzleMonth).toEqual(previousMonth);
  });
});
