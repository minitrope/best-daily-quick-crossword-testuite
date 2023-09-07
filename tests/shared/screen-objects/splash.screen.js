const { Screen } = require('./base.screen.js');

class SplashScreen extends Screen {
    constructor(page) {
        super();
        this.page = page;
        this.root = page.locator('css=.ark-cta.ctaContainer');
        this.playButton = page.getByRole('button', {name: "Play", exact: true});
    }

    async play() {
        await this.playButton.click();
    }
}

exports.SplashScreen = SplashScreen;