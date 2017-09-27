// NOTE: run with babel-node
import path from 'path';
import CoreNLP, { Properties, Pipeline, ConnectorServer } from '../src';

const props = new Properties();
props.setProperty('annotators', 'tokenize,ssplit,regexner,depparse');
const expression = new CoreNLP.simple.Expression(
  'Me gusta la hamburguesa de carne.',
  '{ner:MEAL}=meal > {ner:INGREDIENT}=ingredient');
const pipeline = new Pipeline(props, 'Spanish');

pipeline.annotateSemgrex(expression, true)
  .then(expression => {
    console.log('semgrex sentence0 match0', JSON.stringify(expression.sentence(0).match(0), null, '\t'));
  })
  .catch(err => {
    console.log('err', err);
  });

/*
OUTPUT:
semgrex sentence0 match0 {
  "text": "hamburguesa",
  "begin": 3,
  "end": 4,
  "$meal": {
    "text": "hamburguesa",
    "begin": 3,
    "end": 4,
    "token": {
      "index": 4,
      "word": "hamburguesa",
      "originalText": "hamburguesa",
      "characterOffsetBegin": 12,
      "characterOffsetEnd": 23,
      "before": " ",
      "indexafteafter": " ",
      "pos": "nc0s000",
      "posInfo": "nc0s000",
      "ner": "MEAL"
    }
  },
  "$ingredient": {
    "text": "carne",
    "begin": 5,
    "end": 6,
    "token": {
      "index": 6,
      "word": "carne",
      "originalText": "carne",
      "characterOffsetBegin": 27,
      "characterOffsetEnd": 32,
      "before": " ",
      "indexafteafter": "",
      "pos": "nc0s000",
      "posInfo": "nc0s000",
      "ner": "INGREDIENT"
    }
  },
  "token": {
    "index": 4,
    "word": "hamburguesa",
    "originalText": "hamburguesa",
    "characterOffsetBegin": 12,
    "characterOffsetEnd": 23,
    "before": " ",
    "indexafteafter": " ",
    "pos": "nc0s000",
    "posInfo": "nc0s000",
    "ner": "MEAL"
  }
}
*/
