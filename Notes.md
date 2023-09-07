Notes on the assignment
=======================

Code organisation
-----------------

The code is organised with the following structure:

```
tests/
    calendar.spec.js
    game-page.spec.js
    gameplay.spec.js

    shared/
        shared-steps.js
        test-data.js
        utils.js

        screen-objects/
            ad.screen.js
            base.screen.js
            calendar.screen.js
            crossword.screen.js
            game.page.js
            results.screen.js
            splash.screen.js
```

- Files ending with the `.spec.js` suffix are the different test scenarios
- Everything in `shared` is reusable code.
- `shared-steps.js` has reusable steps to be called in the tests (like loading the game page).
- `test-data.js` is used as a series of data structures to be used while running the tests.
  For example this is where we find the solutions for the daily crosswords.
- Classes under `screen-objects` are game equivalent to [Page Objects](https://www.geeksforgeeks.org/page-object-model-pom/).

Screen Objects
--------------

Screen Objects are like Page Objects but refer to the UI of a game rather than web pages.
Most web games will have one page on which the game runs, but they are composed of multiple screens.

Screen objects allow to bundle common UI instructions related to a specific screen into a well identified class.
A screen object will have locators and methods to interact with the UI as well as querying its state.

This is a best practice in the web industry and is used here as such to provide good encapsulation, re-usable code, and a single source of truth for the code when necessary.

Tests
-----

There are 6 tests split into 3 files:

- Game Page tests (`game-page.spec.js`)
- Calendar tests (`calendar.spec.js`)
- Gameplay tests (`gameplay.spec.js`)

### Game Page tests

We test the initial game page as a way to do a sanity check

- We check the game loads correctly.
- We check we can start the game.

### Calendar tests

Once the game loads we're presented a calendar screen

- We check, as per the given instructions that the current month is correctly displayed.
- We check if we can navigate to the previous month.

### Gameplay tests

The most important tests are in this file

- We assess if loading a puzzle show the correct info for the puzzle of the day.
- We complete the puzzle of the chosen day and assess if we can see the results screen.

Improvements
------------

Given the limited time and because of the nature of the assignment, there are possible improvement to this test suite. Among other things:

- Since the game is tested in a black-box fashion, we have to rely on the existing html structure of the game. This means the locators are currently subpar and might be brittle in the future.
To improve locators, collaboration with the devs is necessary to add the proper test IDs to the html elements.
- The tests verify rarely for viewport visibility. This means some elements might not be visible to the player but they're still interactable. A more robust framework would cover this class of errors to make sure a UI component that is interacted with, is visible to the user.
- Because of the nature of monetisation in the game, each test go through an ad screen. Unfortunately this adds around 30s to each test which is less than optimal. A proper test suite should have the ability to bypass ads when necessary, maybe on a specified controlled environment (a development environment instead of production for example).
