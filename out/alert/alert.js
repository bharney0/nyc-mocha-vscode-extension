"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const common_1 = require("./common");
let commandOption;
function insertAlertCommand() {
    const commands = [
        { command: insertAlert.name, callback: insertAlert },
    ];
    return commands;
}
exports.insertAlertCommand = insertAlertCommand;
/**
 * Formats current selection as an alert
 */
function insertAlert() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    else {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        let formattedText;
        if (!common_1.isMarkdownFileCheck(editor)) {
            return;
        }
        const alertTypes = [
            "Note – Information the user should notice even if skimming",
            "Tip - Optional information to help a user be more successful",
            "Important – Essential information required for user success",
            "Caution - Negative potential consequences of an action",
            "Warning – Dangerous certain consequences of an action",
        ];
        vscode.window.showQuickPick(alertTypes).then((qpSelection) => {
            if (!qpSelection) {
                return;
            }
            else {
                formattedText = common_1.format(selectedText, alertTypes.indexOf(qpSelection));
            }
            if (editor) {
                common_1.insertContentToEditor(editor, insertAlert.name, formattedText, true);
                if (qpSelection.startsWith("Note")) {
                    commandOption = "note";
                }
                if (qpSelection.startsWith("Tip")) {
                    commandOption = "tip";
                }
                if (qpSelection.startsWith("Important")) {
                    commandOption = "important";
                }
                if (qpSelection.startsWith("Caution")) {
                    commandOption = "caution";
                }
                if (qpSelection.startsWith("Warning")) {
                    commandOption = "warning";
                }
            }
        });
    }
}
exports.insertAlert = insertAlert;
//# sourceMappingURL=alert.js.map