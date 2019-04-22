const { override, addDecoratorsLegacy, disableEsLint } = require('customize-cra');
const rewireInlineImportGraphqlAst = require('react-app-rewire-inline-import-graphql-ast');

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  rewireInlineImportGraphqlAst,
);
