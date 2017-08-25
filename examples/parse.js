import SimpleCoreNLP from '../src';
import { ParserAnnotator } from '../src/simple/annotator';

SimpleCoreNLP.setup(null, 'English');
const sent = new SimpleCoreNLP.Sentence('The little dog runs so fast.');
sent.applyAnnotator(ParserAnnotator)
  .then(() => {
    console.log('parse', sent.parse());
    console.log(SimpleCoreNLP.Tree.fromSentence(sent).dump());
  })
  .catch(err => {
    console.log('err', err);
  });

const doc = new SimpleCoreNLP.Document('The little dog runs so fast. The cat is in the kitchen.');
doc.applyAnnotator(ParserAnnotator)
  .then(() => {
    doc.sentences().forEach(sent => {
      console.log('parse', sent.parse());
      console.log(SimpleCoreNLP.Tree.fromSentence(sent).dump());
    });
  })
  .catch(err => {
    console.log('err', err);
  });
