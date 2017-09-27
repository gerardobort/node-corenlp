// NOTE: run with babel-node
import path from 'path';
import CoreNLP, { Properties, Pipeline } from '../src';

const text = `La quiero con mayonesa, sin kétchup y con mostaza. Dejale el tomate, pero sacale la lechuga y la carne. Dejale el oregano, pero reemplazame la cebolla por la gaseosa.  Y agrandame las papas y cambiámelas por un cono de vainilla.  Y si no tenés de vainilla ponele kétchup a la comida y agrandame el menú por 50 centavos.  Pero no le pongas condimentos al helado porque vengo del cine y ella se llama Valentina.`;
const pattern = `
  ({pos:/(nc|np|pp|aq|da).*/}=thing ?>nummod {}=quantity ?>/amod|nsubj/ {}=thing_type)
  [
    >nmod {}=extra_thing
    | <dobj ( {ner:ORDER_REPLACE}=main_verb
      ?>nsubj {}=who
      [>punct {pos:fp} | </conj.*/ {}]
      [ ?@{} | >dobj ({} >nmod ({}=replace_by >case !{ner:/ORDER.*/}=by)) |>nmod ({}=replace_by >case !{ner:/ORDER.*/}=by)])
    | <dobj ( !{ner:ORDER_REPLACE}=main_verb
      ?>neg {}=negate
      ?>nsubj {}=who
      ?>iobj {}=thing_to
      ?>nmod {pos:/(nc|np|pp|aq).*/}=thing_to
      [>punct {pos:fp} | </conj.*/ {}]
      [ ?@{} | >>nmod ({}=extra_thing ?>case {ner:/ORDER_(ADD|REMOVE)/}=addrem) ])
  ]
`.replace(/[\r\n]/g, '').trim(); // this is a KEY to work

const props = new Properties();
props.setProperty('annotators', 'tokenize,ssplit,regexner,depparse');
props.setProperty('regexner.mapping', path.resolve('./regexner.tag'));
props.setProperty('regexner.ignorecase', true);
const expression = new CoreNLP.simple.Expression(text, pattern);
const pipeline = new Pipeline(props, 'Spanish');

pipeline.annotateSemgrex(expression, true)
  .then(expression => {
    console.log('semgrex expression', JSON.stringify(expression.sentence(0).match(2).group('extra_thing'), null, '\t'));
    console.log('semgrex expression', JSON.stringify(expression.sentence(0).match(2).label('extra_thing'), null, '\t'));
    console.log('semgrex expression', JSON.stringify(expression.sentence(0).match(2), null, '\t'));
  })
  .catch(err => {
    console.log('err', err);
  });

/*
OUTPUT:
semgrex expression [
  {
    "text": "mostaza",
    "begin": 9,
    "end": 10,
    "label": "extra_thing"
  },
  {
    "text": "mayonesa",
    "begin": 3,
    "end": 4,
    "label": "thing_to"
  },
  {
    "text": "La",
    "begin": 0,
    "end": 1,
    "label": "thing"
  },
  {
    "text": "quiero",
    "begin": 1,
    "end": 2,
    "label": "main_verb"
  },
  {
    "text": "con",
    "begin": 8,
    "end": 9,
    "label": "addrem"
  }
]
*/
