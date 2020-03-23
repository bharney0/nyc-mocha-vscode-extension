"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alert_1 = require("./alert/alert");
function activate(context) {
    const AuthoringCommands = [];
    alert_1.insertAlertCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    AuthoringCommands.map((cmd) => {
        const commandName = cmd.command;
        const command = vscode.commands.registerCommand(commandName, cmd.callback);
        context.subscriptions.push(command);
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map