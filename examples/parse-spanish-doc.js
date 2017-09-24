// NOTE: run with babel-node
import CoreNLP, { Properties, Pipeline } from '../src';

const props = new Properties();
props.setProperty('annotators', 'tokenize,ssplit,pos,lemma,ner,parse');
const pipeline = new Pipeline(props, 'Spanish');

const doc = new CoreNLP.simple.Document('Jorge quiere cinco empanadas de queso y carne.');
pipeline.annotate(doc)
  .then(doc => {
    const sent = doc.sentence(0);
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  })
  .catch(err => {
    console.log('err', err);
  });
