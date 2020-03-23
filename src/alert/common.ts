import * as vscode from "vscode";

const AlertTags = [
    "> [!NOTE]\r\n",
    "> [!TIP]\r\n",
    "> [!IMPORTANT]\r\n",
    "> [!CAUTION]\r\n",
    "> [!WARNING]\r\n",
];
enum AlertType {
    Note = 0,
    Tip,
    Important,
    Caution,
    Warning,
}

/**
 * Returns the alert type
 * @param {string} content - the string content
 * @return {AlertType} - the type of alert i.e. Note, Warning, Important, Tip
 */
export function getAlertType(content: string) {
    return AlertTags.findIndex((tag) => content.startsWith(tag));
}

/**
 * Checks if the string input is a valid alert
 * @param {string} content - the string content
 * @return {boolean} - true/false the content is an alert
 */
export function isAlert(content: string) {
    // Check if the content starts with an alert tag and if all paragraphs contain the ">" formatter
    if ((AlertTags.some((tag) => content.startsWith(tag))) &&
        (content.split("\n").every((line) => line.startsWith(">")))) {
        return true;
    } else {
        return false;
    }
}

/**
 *  Returns input string formatted as the alert type
 * If input string is an alert of the same type as alertType, it removes the formatting
 * If input string is an alert of different type than alertType
 * It formats the original string as the new alert type
 * @param {string} content - selectedText
 * @param {enum} alertType - type of alert - Note, Important, Warning, Tip
 */
export function format(content: string, alertType: AlertType) {
    const alertPlaceholderText = [
        "Information the user should notice even if skimming",
        "Optional information to help a user be more successful",
        "Essential information required for user success",
        "Negative potential consequences of an action",
        "Dangerous certain consequences of an action",
    ];
    let selectedText = content;
    if (isAlert(content)) {
        if (getAlertType(content) === alertType) {
            // split the text into paragraphs,
            // remove formatting from each paragraph,
            // remove the first item (which contains the alert type)
            const paragraphsAlert = selectedText.split("\r\n").map((text) => text.substring(2)).slice(1);
            return paragraphsAlert.join("\r\n");
        } else {
            // split the text into paragraphs and remove the first item (which contains the alert type)
            const paragraphsGeneric = selectedText.split("\r\n").slice(1);
            const resultParagraphsGeneric = AlertTags[alertType] + paragraphsGeneric.join("\r\n");
            return resultParagraphsGeneric;
        }
    }
    if (selectedText.length === 0) {
        selectedText = alertPlaceholderText[alertType];
    }
    // split the text into paragraphs and format each paragraph
    const paragraphs = selectedText.split("\r\n").map((text) => "> " + text);
    const result = AlertTags[alertType] + paragraphs.join("\r\n");
    return result;
}


export function insertContentToEditor(editor: vscode.TextEditor, senderName: string, content: string, overwrite: boolean = false, selection: vscode.Range = null!) {

    if (selection === null) {
        selection = editor.selection;
    }

    try {
        if (overwrite) {
            editor.edit((update) => {
                update.replace(selection, content);
            });
        } else {
            // Gets the cursor position
            const position = editor.selection.active;

            editor.edit((selected) => {
                selected.insert(position, content);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function isMarkdownFileCheck(editor: vscode.TextEditor) {
    if (editor.document.languageId !== "markdown") {
        if (editor.document.languageId !== "yaml") {
            console.log("Not markdown or yaml document.");
        }
        return false;
    } else {
        return true;
    }
}