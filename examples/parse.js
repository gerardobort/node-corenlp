// NOTE: run with babel-node
import CoreNLP, { Properties, Pipeline, ConnectorServer } from '../src';

const connector = new ConnectorServer({ dsn: 'http://corenlp.run' });
const props = new Properties({ annotators: 'tokenize,ssplit,pos,lemma,ner,parse' });
const pipeline = new Pipeline(props, 'Spanish');

const sent = new CoreNLP.simple.Sentence('A los pibes les gusta tomar Fernet con Coca.');
pipeline.annotate(sent)
  .then(function(sent) {
    console.log('pos', sent.tokens().map(token => `${token.word()}: ${token.posInfo().tag}`));
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  })
  .catch(function(err) {
    console.log('err', err);
  });
