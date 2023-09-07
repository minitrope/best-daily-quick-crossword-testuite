const { Screen } = require('./base.screen.js');
const { delay, inSeconds } = require('../utils');

class AdScreen extends Screen {
    constructor(page) {
        super();
        this.page = page;
        this.root = page.locator('css=#ark_pre-roll');
        this.skipButton =  page.getByText('Play now', { exact: true });
    }

    async watch()
    {
        await this.root.waitFor({state: "hidden", timeout: inSeconds(45)});
    }

    async skip()
    {
        await this.skipButton.waitFor({state: "visible", timeout: inSeconds(30)});
        await this.skipButton.click();
    }
}

exports.AdScreen = AdScreen;