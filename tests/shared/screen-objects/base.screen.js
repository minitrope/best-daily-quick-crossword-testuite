class Screen {
    async isVisible()
    {
        try{
            await this.root.waitFor({state: "visible", timeout: inSeconds(10)});
        } catch (error) {
        }
        return await this.root.isVisible();
    }
}

exports.Screen = Screen;