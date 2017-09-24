// NOTE: run with babel-node
import path from 'path';
import CoreNLP, { Properties, Pipeline } from '../src';

const props = new Properties();
props.setProperty('annotators', 'tokenize,ssplit,depparse,regexner');
// IMPORTANT: when using ConnectorServer, this option needs to be set
// from serverProperties or per-language properties file, because otherwise gets overriden and doesn't work
// - the `regexner.tag` file is provided along with this example
props.setProperty('regexner.mapping', path.resolve('./regexner.tag'));
props.setProperty('regexner.ignorecase', true);
const expression = new CoreNLP.simple.Expression('Me encantan las empanadas de carne picante', '{ner:INGREDIENT}');
const pipeline = new Pipeline(props, 'Spanish');

pipeline.annotateSemgrex(expression)
  .then(data => {
    console.log('semgrex data', JSON.stringify(data, null, '\t'));
  })
  .catch(err => {
    console.log('err', err);
  });

/*
OUTPUT:
semgrex data {
  "text": "Me encantan las empanadas de carne picante",
  "sentences": [
    [
      {
        "text": "carne",
        "begin": 5,
        "end": 6
      }
    ]
  ]
}
*/
