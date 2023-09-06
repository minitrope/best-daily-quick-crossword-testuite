exports.GamePage = class GamePage {
    constructor(page) {
        this.page = page;
        this.declineCookiesButton = page.getByRole('button', {name: "DISAGREE", exact: true});
    }

    async go()
    {
        await this.page.goto("https://www.gamelab.com/games/daily-quick-crossword");
    }

    async declineCookies()
    {
        await this.declineCookiesButton.click();
    }

    async pause()
    {
        await this.page.pause();
    }

    getGameFrame()
    {
        return this.page.frameLocator('css=#game-canvas');
    }
}