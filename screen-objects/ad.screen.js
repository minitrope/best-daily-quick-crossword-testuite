const { delay, inSeconds } = require('../utils');

exports.AdScreen = class AdScreen {
    constructor(page) {
        this.page = page;
        this.skipButton =  page.getByText('Play now', { exact: true });
        // page.locator('css=.ark-skip-button').filter({hasText: 'Play now'});
    }

    async watch()
    {
        await delay(inSeconds(30))
    }

    async skip()
    {
        await this.skipButton.isVisible({timeout: inSeconds(30)});
        await this.skipButton.click();
    }

    async forceSkip()
    {
        await this.skipButton.click({force: true});
    }
}

