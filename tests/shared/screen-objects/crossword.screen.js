const { expect } = require('@playwright/test');
const { ResultsScreen } = require('./results.screen.js');
const { delay, inSeconds } = require('../utils.js');

class CrosswordScreen {
    constructor(frame) {
        this.frame = frame;
        this.puzzleInfo = frame.getByText('Daily Quick Crossword: ');
        this.gameContainer = frame.locator('css=#gameContainer');
        this.cluesContainer = this.gameContainer.locator('css=.game_cluesContainer__1O_1o');
        this.acrossPanel = this.cluesContainer.locator('css=> section').first();
        this.downPanel = this.cluesContainer.locator('css=> section').nth(1);

        this.gridLayout = this.gameContainer.locator('css=.game_gridLayout__2Qcqy');
        this.inlineClue = this.gameContainer.locator('css=.game_inlineClue__S1HxM');
        this.pencilModeButton = this.gameContainer.locator('css=[data-tip="Pencil mode (Ctrl+L)"]')
        this.checkButton = this.gameContainer.getByRole('button', {name: 'Check'});
        this.checkPuzzleButton = this.checkButton.getByText('Check puzzle');
        this.menu = this.gameContainer.locator('css=.game_burger__2Kglm');
        this.skipOverFilledSquaresToggle = this.gameContainer.getByText('Skip over filled squares');
        this.menuCloseButton = this.gameContainer.locator('css=._1nGHHNch1WYjKm6o-mNMNs');
    }

    async getPuzzleInfo() {
        return await this.puzzleInfo.textContent();
    }

    async getNumberOfCluesAcross() {
        return await this.acrossPanel.getByRole('listitem').count();
    }

    async getCluesAcross() {
        return await this.getClues(this.acrossPanel);
    }

    async getCluesDown() {
        return await this.getClues(this.downPanel);
    }

    async getClues(locator)
    {
        let clues = await locator.getByRole('listitem').all();
        return clues.map(clue => {
            return new Clue(clue);
        });
    }

    async findTile(number)
    {
        let tile = await this.gridLayout.locator('svg')
            .locator('g[role=table]')
            .locator('g')
            .filter({has: this.frame.getByText(String(number), {exact: true})});
        return new Tile(tile, this);
    }

    async getInputMode()
    {
        let text = await this.inlineClue.textContent();
        if (/\d+ [dD]own/.test(text))
        {
            return "down";
        }
        if (/\d+ [aA]cross/.test(text))
        {
            return "across";
        }
    }

    async togglePencilMode()
    {
        await this.pencilModeButton.click();
    }

    async toggleSkipOverFilledSquares()
    {
        await this.menu.click();
        await this.skipOverFilledSquaresToggle.click();
        await this.menuCloseButton.click();
    }

    async checkPuzzle()
    {
        await this.checkButton.click();
        await this.checkPuzzleButton.click();
    }

    getResultsScreen()
    {
        return new ResultsScreen(this.frame); 
    }
}

class Clue {
    constructor(clue) {
        this.clue = clue;
    }

    async getNumber()
    {
        let text = await this.clue.textContent();
        let number = text.split(/[|]/)[0]
        number = parseInt(number);
        return number;
    }
}

class Tile {
    constructor(tile, crosswordScreen) {
        this.crossword = crosswordScreen;
        this.tile = tile;
    }

    async select (mode)
    {
        await this.tile.click();
        await delay(inSeconds(1));
        if (await this.crossword.getInputMode() != mode)
        {
            await this.tile.click();
            await delay(inSeconds(1));
        }
        expect(await this.crossword.getInputMode()).toEqual(mode);
    }

    async type(text)
    {
        this.tile.type(text);
    }
}

exports.CrosswordScreen = CrosswordScreen;