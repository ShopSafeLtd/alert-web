// extractOperationFieldsJSON.js
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
  let result = {};

  documents.forEach((doc) => {
    visit(doc.document, {
      OperationDefinition(node) {
        if (node.operation === 'query' || node.operation === 'mutation') {
          if (node.selectionSet) {
            const operationTree = buildFieldTree(node.selectionSet);

            result = mergeTrees(result, operationTree);
          }
        }
      },
    });
  });

  return JSON.stringify(result, null, 2);
};
