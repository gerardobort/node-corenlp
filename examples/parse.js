// NOTE: run with babel-node
import CoreNLP, { Properties, Pipeline } from '../src';

const props = new Properties();
props.setProperty('annotators', 'tokenize,ssplit,pos,lemma,ner,parse');
const pipeline = new Pipeline(props, 'English');

const sent = new CoreNLP.simple.Sentence('The little dog runs so fast.');
pipeline.annotate(sent)
  .then(sent => {
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  })
  .catch(err => {
    console.log('err', err);
  });
