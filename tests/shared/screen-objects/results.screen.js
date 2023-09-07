class ResultsScreen {
    constructor(frame) {
        this.frame = frame;
        this.popup = this.frame.locator('css=._1WOLqIpDmSmsJGpFvS9fPR');
    }

    getPopup()
    {
        return this.popup;
    }
}

exports.ResultsScreen = ResultsScreen;