"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const spies = require("chai-spies");
const path_1 = require("path");
const vscode_1 = require("vscode");
const extension_1 = require("../../extension");
const common = require("../../alert/common");
chai.use(spies);
const expect = chai.expect;
suite("Alert", () => {
    test("insertAlertCommand", () => {
        const commands = [
            { command: extension_1.insertAlert.name, callback: extension_1.insertAlert },
        ];
        expect(extension_1.insertAlertCommand()).to.deep.equal(commands);
    });
    test("isMarkdownFileCheck", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.resolve(__dirname, "../../../src/test/data/docs-markdown.md");
        const docUri = vscode_1.Uri.file(filePath);
        const document = yield vscode_1.workspace.openTextDocument(docUri);
        yield vscode_1.window.showTextDocument(document);
        const spy = chai.spy.on(common, "isMarkdownFileCheck");
        extension_1.insertAlert();
        expect(spy).to.have.been.called();
    }));
    test("insertContentToEditor - Note", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.resolve(__dirname, "../../../src/test/data/docs-markdown.md");
        const docUri = vscode_1.Uri.file(filePath);
        const document = yield vscode_1.workspace.openTextDocument(docUri);
        yield vscode_1.window.showTextDocument(document);
        vscode_1.window.showQuickPick = (items) => {
            return Promise.resolve("Note – Information the user should notice even if skimming");
        };
        const spy = chai.spy.on(common, "insertContentToEditor");
        extension_1.insertAlert();
        yield sleep(400);
        expect(spy).to.have.been.called();
    }));
});
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//# sourceMappingURL=extension.test.js.map