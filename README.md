Tests for Best Daily Quick Crossword
====================================

Assignment
----------

Write an automation script using your preferred programming language and
automation framework to test the following scenario in a web game
“Best Daily Quick Crossword”:

- Start the game.
- Navigate to a specific day within the game.
- Perform the following actions:
  - Verify that the date of puzzle (day) has loaded correctly.
  - Interact with the game controls (buttons, navigations) to complete the puzzle.
  - Verify that the level completion screen appears after successfully finishing the day
  - puzzle.
  - Take a screenshot of the puzzle completion screen.
  - Quit the game and Restart.

Link to the game: https://www.gamelab.com/games/daily-quick-crossword

Install
-------

To install the repo, clone it first:

```
git clone <url-of-the-repository>
cd best-daily-quick-crossword-testuite
```

install the dependencies via npm and then the playwright command line (if you don't have npm or node, install it via https://nodejs.org/en):

```
npm install
npx playwright install
npx playwright install-deps
```

Run the tests
-------------

To run the tests, run the following command:

```
npx playwright test
```

The tests run in the background.
Once you have a report you can open it with the following command:

```
npx playwright show-report
```

To run a specific test you can give its title:

```
npx playwright test -g 'Can be completed'
```

Generated reports will be under the `playwright-report` folder, while generated videos for each test can be found under `test-results`.
For more information about Playwright's command line and its option, you can refer to the documentation: https://playwright.dev/docs/test-cli

Troubleshooting
---------------

If you need to troubleshoot the tests, you can run them in debug mode like so:

```
npx playwright test --debug
```

Once the inspector is open you can press play and see the test running live.

Another solution is to use the UI:

```
npx playwright test --ui
```

It is useful for every test authoring, but also inspecting snapshots of the page at runtime.

