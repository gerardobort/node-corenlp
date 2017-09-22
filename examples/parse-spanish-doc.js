import CoreNLP from '../src';

// Simple (https://stanfordnlp.github.io/CoreNLP/simple.html)

const props = new CoreNLP.Properties();
props.setProperty('annotators', 'tokenize,ssplit,pos,lemma,ner,parse');
const pipeline = new CoreNLP.Pipeline(props, 'Spanish');

const doc = new CoreNLP.simple.Document('Jorge quiere cinco empanadas de queso y carne.');
pipeline.annotate(doc)
  .then((doc) => {
    const sent = doc.sentence(0);
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent, pipeline.getService()).dump());
  })
  .catch(err => {
    console.log('err', err);
  });
