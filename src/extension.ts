import * as vscode from 'vscode';
import { insertAlertCommand } from './alert/alert';

export function activate(context: vscode.ExtensionContext) {
	const AuthoringCommands: any = [];
	insertAlertCommand().forEach((cmd) => AuthoringCommands.push(cmd));
	AuthoringCommands.map((cmd: any) => {
		const commandName = cmd.command;
		const command = vscode.commands.registerCommand(commandName, cmd.callback);
		context.subscriptions.push(command);
	});
}

export function deactivate() { }
