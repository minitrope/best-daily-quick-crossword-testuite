class GamePage {
    constructor(page) {
        this.page = page;
        this.GDPRPopup = page.locator('css=#qc-cmp2-ui');
        this.declineCookiesButton = page.getByRole('button', { name: "DISAGREE", exact: true });
    }

    async go() {
        await this.page.goto("https://www.gamelab.com/games/daily-quick-crossword");
    }

    async hasGDPRPopup() {
        try {
            await this.GDPRPopup.waitFor({ state: "visible", timeout: inSeconds(10) });
        } catch (error) {
        }
        return this.GDPRPopup.isVisible();
    }

    async declineCookies() {
        await this.declineCookiesButton.click();
    }

    async pause() {
        await this.page.pause();
    }

    getGameFrame() {
        return this.page.frameLocator('css=#game-canvas');
    }
}

exports.GamePage = GamePage;