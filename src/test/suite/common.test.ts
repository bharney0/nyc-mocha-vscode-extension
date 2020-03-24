import * as chai from "chai";
import * as spies from "chai-spies";
import { resolve } from "path";
import { Uri, window, workspace } from "vscode";
import { isMarkdownFileCheck } from "../../alert/common";

chai.use(spies);

const expect = chai.expect;

suite("Common", () => {
    test("isMarkdownFileCheck is markdown document", async () => {
        const filePath = resolve(__dirname, "../../../src/test/data/docs-markdown.md");
        const docUri = Uri.file(filePath);
        const document = await workspace.openTextDocument(docUri);
        const editor = await window.showTextDocument(document);
        sleep(400);
        const returnValue = isMarkdownFileCheck(editor);
        expect(returnValue).equal(true);
    });
    test("isMarkdownFileCheck is not markdown document", async () => {
        const filePath = resolve(__dirname, "../../../src/test/data/docs-yaml.yml");
        const docUri = Uri.file(filePath);
        const document = await workspace.openTextDocument(docUri);
        const editor = await window.showTextDocument(document);
        sleep(400);
        const returnValue = isMarkdownFileCheck(editor);
        expect(returnValue).equal(false);
    });
});

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
