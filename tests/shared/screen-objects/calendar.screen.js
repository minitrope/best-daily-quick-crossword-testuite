const { calendarMonth } = require('../utils.js');

class CalendarScreen {
    constructor(gameFrame, month = null) {
        // this.page = page;
        // this.frame = page.frameLocator('css=#game-canvas');
        this.frame = gameFrame;
        this.calendar = this.frame.locator('css=[data-testid=calendarCard]')

        if (month == null)
        {
            month = new Date().getMonth();
        }
        this.month = month;

        this.monthHeader = this.calendar.locator('section').filter({has: this.frame.getByText(calendarMonth(this.month), {exact: true})});
        this.previousMonth = this.monthHeader.getByRole('button').nth(1);
        this.nextMonth = this.monthHeader.getByRole('button').last();
    }

    async playDay(weekday, dayNumber)
    {
        let dayCard = this.calendar.getByRole('listitem')
            .filter({ has: this.frame.getByText(weekday) })
            .filter({ has: this.frame.getByText(dayNumber) });
        await dayCard.click();
    }

    async getMonth()
    {
        return await this.monthHeader.getByText(calendarMonth(this.month)).textContent();
    }

    async goToPreviousMonth()
    {
        await this.previousMonth.click();
        return new CalendarScreen(this.frame, this.month - 1);
    }

    async goToNextMonth()
    {
        await this.nextMonth.click();
        return new CalendarScreen(this.frame, this.month + 1);
    }
}

exports.CalendarScreen = CalendarScreen;
