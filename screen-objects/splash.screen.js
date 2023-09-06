exports.SplashScreen = class SplashScreen {
    constructor(page) {
        this.page = page;
        this.playButton = page.getByRole('button', {name: "Play", exact: true});
    }

    async play() {
        await this.playButton.click();
    }
}