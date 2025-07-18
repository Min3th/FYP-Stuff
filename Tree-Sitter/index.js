const fs = require("fs");
const Parser = require("tree-sitter");
const JavaScript = require("tree-sitter-javascript");

const code = fs.readFileSync("input.js", "utf8");

const parser = new Parser();
parser.setLanguage(JavaScript);

const tree = parser.parse(code);
const rootNode = tree.rootNode;

const services = {};

function extractFunctionData(node, comments) {
  const funcName = node.firstChild.text;
  const startIndex = node.startIndex;
  const codeSnippet = code.slice(node.startIndex, node.endIndex);

  const annontations = [];
  const endpoints = [];
  let serviceName = "UnknownService";

  for (const comment of comments) {
    if (comment.endIndex < startIndex) {
      const text = comment.text.trim().replace(/^\/\//, "").trim();
      annontations.push(`@${text}`);
      if (text.startsWith("@service:")) {
        serviceName = text.split("")[1];
      }
      if (text.startsWith("@route")) {
        endpoints.push(text.split("")[1]);
      }
    }
  }

  return {
    serviceName,
    funcName,
    funcData: {
      annontations,
      code: codeSnippet.replace(/\n\s*/g, "").trim(),
      endpoints,
    },
  };
}

const comments = rootNode.descendantsOfType("comment");

rootNode.children.forEach((node) => {
  if (node.type === "function_declaration") {
    const { serviceName, funcName, funcData } = extractFunctionData(node, comments);
    if (!services[serviceName]) services[serviceName] = { functions: {} };
    services[serviceName].functions[funcName] = funcData;
  }
});

console.log(JSON.stringify(services, null, 2));
