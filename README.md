# bonpatron-gdoc: A BonPatron plugin for Google Docs

This is a simple editor add-on for Google Docs which checks the grammar of (currently only French) text using [BonPatron](https://bonpatron.com/).

## Installation

The add-on is not yet published in the Google Workspace Marketplace. Follow these steps to deploy a test version of the add-on:

1. Open the [Apps Script project](https://script.google.com/d/12sF4_9e74HwwWuHhZ6HiqDwamaFnd9V4Wf8JozIjUe6tT717f4a24dN4/edit) in your browser.
2. Click on `Overview` in the left sidebar, then `Make a Copy` to create a copy of the project.
3. Click on `Deploy -> Test deployments` in the top menu.
4. Select `Editor add-on` in the `Select type` settings button.
5. Click on `Create new test`, then choose a Google Doc in `Test document` to test the add-on with.
6. Click on `Save test`.
7. Select the first (and only) item in the `Saved tests` list and click `Execute`.

The chosen Google Doc will open in a new tab with the add-on installed.

## Usage

1. Select some text to check in the Google Doc.
2. Open the add-on by clicking on `Extensions -> [add-on name] -> Check` in the top toolbar. Permissions will be requested to access the document on the first run.
3. Change the settings on the top bar if needed.
4. Use `Shift+Enter` or `Ctrl+Enter` to check the text.
5. Possible errors are outlined in red, and the specific error is displayed on hover.
6. When you are done, click `Save` to append the corrected text to the end of the document. **Closing the add-on without saving will discard all changes.**