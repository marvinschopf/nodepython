const filbert = require("filbert");
const escodegen = require("escodegen");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log(chalk`{bold.red You need to specify a filename!}`);
  process.exit(1);
}

const filepath = path.resolve(args[0]);
const data = fs.readFileSync(filepath, "utf-8");

const parsed = filbert.parse(data);
let code = escodegen.generate(parsed);
code =
  "(function(" +
  filbert.defaultOptions.runtimeParamName +
  "){" +
  code +
  "})(filbert.pythonRuntime);";

const jsFilePath = filepath.replace(".py", ".js");
fs.writeFileSync(jsFilePath, code, "utf-8");

eval(code);
