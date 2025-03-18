const { visit } = require('graphql');

module.exports.plugin = (schema, documents, config) => {
  const operations = new Set();

  documents.forEach((doc) => {
    visit(doc.document, {
      OperationDefinition(node) {
        if (node.name && node.name.value) {
          operations.add(node.name.value);
        }
      },
    });
  });

  return Array.from(operations).join('\n');
};
