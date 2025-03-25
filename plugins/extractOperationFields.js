const { visit } = require('graphql');

module.exports.plugin = (schema, documents, config) => {
  const fields = new Set();

  documents.forEach((doc) => {
    visit(doc.document, {
      OperationDefinition(node) {
        if (node.operation === 'query' || node.operation === 'mutation') {
          node.selectionSet.selections.forEach((selection) => {
            if (
              selection.kind === 'Field' &&
              selection.name &&
              selection.name.value
            ) {
              fields.add(selection.name.value);
            }
          });
        }
      },
    });
  });

  return Array.from(fields).join('\n');
};
