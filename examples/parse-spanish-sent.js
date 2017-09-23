import CoreNLP from '../src';

// Simple (https://stanfordnlp.github.io/CoreNLP/simple.html)

const props = new CoreNLP.Properties();
props.setProperty('annotators', 'tokenize,ssplit,pos,lemma,ner,parse');
const pipeline = new CoreNLP.Pipeline(props, 'Spanish');

const sent = new CoreNLP.simple.Sentence('Jorge quiere cinco empanadas de queso y carne.');
pipeline.annotate(sent)
  .then((sent) => {
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent, pipeline.getService()).dump());
  })
  .catch(err => {
    console.log('err', err);
  });
