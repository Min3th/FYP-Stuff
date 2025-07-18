const Parser = require("tree-sitter");
const JavaScript = require("tree-sitter-javascript");

const parser = new Parser();
parser.setLanguage(JavaScript);

const addFunc = function (a, b) {
  return a + b;
};

function printTree(node, indent = 0) {
  console.log(" ".repeat(indent) + node.type);
  for (let i = 0; i < node.namedChildCount; i++) {
    printTree(node.namedChild(i), indent + 2);
  }
}
const tree = parser.parse(`${addFunc.toString()}`);

printTree(tree.rootNode);
console.log(tree.rootNode.toString());
