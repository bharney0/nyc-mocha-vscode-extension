"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const Mocha = require("mocha");
const path = require("path");
function setupNyc() {
    const NYC = require("nyc");
    // create an nyc instance, config here is the same as your package.json
    const nyc = new NYC({
        cache: false,
        cwd: path.join(__dirname, "..", "..", ".."),
        exclude: [
            "**/**.test.js",
        ],
        extension: [
            ".ts",
            ".tsx",
        ],
        hookRequire: true,
        hookRunInContext: true,
        hookRunInThisContext: true,
        instrument: true,
        reporter: ["text", "html", "cobertura"],
        require: [
            "ts-node/register",
        ],
        sourceMap: true,
    });
    nyc.reset();
    nyc.wrap();
    return nyc;
}
function run() {
    const nyc = setupNyc();
    // Create the mocha test
    const mocha = new Mocha({
        color: true,
        ui: "tdd",
        timeout: 5000,
    });
    const testsRoot = path.resolve(__dirname, "..");
    return new Promise((c, e) => {
        glob("**/**.test.js", { cwd: testsRoot }, (err, files) => {
            if (err) {
                return e(err);
            }
            // Add files to the test suite
            files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));
            try {
                // Run the mocha test
                mocha.run((failures) => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    }
                    else {
                        c();
                    }
                });
            }
            catch (err) {
                // tslint:disable-next-line: no-console
                console.error(err);
                e(err);
            }
            finally {
                if (nyc) {
                    nyc.writeCoverageFile();
                    nyc.report();
                }
            }
        });
    });
}
exports.run = run;
//# sourceMappingURL=index-coverage.js.map