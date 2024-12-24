/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Check', 'checkText')
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Gets the text the user has selected. If there is no selection,
 * this function displays an error message.
 *
 * @return {Array.<string>} The selected text.
 */
function getSelectedText() {
  const selection = DocumentApp.getActiveDocument().getSelection();
  const text = [];
  if (selection) {
    const elements = selection.getSelectedElements();
    for (let i = 0; i < elements.length; ++i) {
      if (elements[i].isPartial()) {
        const element = elements[i].getElement().asText();
        const startIndex = elements[i].getStartOffset();
        const endIndex = elements[i].getEndOffsetInclusive();

        text.push(element.getText().substring(startIndex, endIndex + 1));
      } else {
        const element = elements[i].getElement();
        // Only translate elements that can be edited as text; skip images and
        // other non-text elements.
        if (element.editAsText) {
          const elementText = element.asText().getText();
          // This check is necessary to exclude images, which return a blank
          // text element.
          if (elementText) {
            text.push(elementText);
          }
        }
      }
    }
  }
  return text.join("\n");
}

function checkConfig(key, value) {
    const defaults = {
        gender: "m",
        native: ""
    }
    var property = PropertiesService.getUserProperties().getProperty(key);
    if (property === null) {
        property = defaults[key];
    }
    if (property === value) {
        return "checked";
    } else {
        return "";
    }
}

function setConfig(key, value) {
    PropertiesService.getUserProperties().setProperty(key, value);
}

/**
 * Replaces the text of the current selection with the provided text, or
 * inserts text at the current cursor location. (There will always be either
 * a selection or a cursor.) If multiple elements are selected, only inserts the
 * translated text in the first element that can contain text and removes the
 * other elements.
 *
 * @param {string} newText The text with which to replace the current selection.
 */

function insertText(newText) {
    const body = DocumentApp.getActiveDocument().getBody();
    body.appendParagraph(newText);
}

function checkText() {
    if (!getSelectedText().length) {
        DocumentApp.getUi().alert('Please select some text to check.');
    } else {
        const page = HtmlService
            .createTemplateFromFile('page')
            .evaluate()
            .setWidth(999999)   // Will be limited to the size of the screen
            .setHeight(999999);
        DocumentApp.getUi().showModalDialog(page, 'bonpatron-gdoc');
    }
}

function fetch(config) {
    const url = "https://bonpatron.com/ajax"
    const options = {
        method: "POST",
        payload: config
    };
    return UrlFetchApp.fetch(url, options).getContentText();
}