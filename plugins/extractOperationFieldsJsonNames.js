
const { visit } = require('graphql');

function mergeTrees(tree1, tree2) {
  for (const key in tree2) {
    if (Object.prototype.hasOwnProperty.call(tree1, key)) {
      tree1[key] = mergeTrees(tree1[key], tree2[key]);
    } else {
      tree1[key] = tree2[key];
    }
  }
  return tree1;
}

function buildFieldTree(selectionSet) {
  let tree = {};
  if (!selectionSet) return tree;
  selectionSet.selections.forEach((selection) => {
    if (selection.kind === 'Field') {
      const fieldName = selection.name.value;
      let subtree = {};
      if (selection.selectionSet) {
        subtree = buildFieldTree(selection.selectionSet);
      }
      if (tree[fieldName]) {
        tree[fieldName] = mergeTrees(tree[fieldName], subtree);
      } else {
        tree[fieldName] = subtree;
      }
    }
  });
  return tree;
}

module.exports.plugin = (schema, documents, config) => {
  const operationsResult = {};

  documents.forEach((doc) => {
    visit(doc.document, {
      OperationDefinition(node) {
        if (node.name && node.name.value) {
          const operationName = node.name.value;
          const fieldTree = buildFieldTree(node.selectionSet);
          if (operationsResult[operationName]) {
            operationsResult[operationName] = mergeTrees(
              operationsResult[operationName],
              fieldTree
            );
          } else {
            operationsResult[operationName] = fieldTree;
          }
        }
      },
    });
  });

  return JSON.stringify(operationsResult, null, 2);
};
