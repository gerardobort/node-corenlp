import CoreNLP from '../src';

CoreNLP.setup('English');
const sent = new CoreNLP.simple.Sentence('The little dog runs so fast.');
sent.applyAnnotator(CoreNLP.simple.annotator.ParserAnnotator)
  .then(() => {
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  })
  .catch(err => {
    console.log('err', err);
  });

const doc = new CoreNLP.simple.Document('The little dog runs so fast. The cat is in the kitchen.');
doc.applyAnnotator(CoreNLP.simple.annotator.ParserAnnotator)
  .then(() => {
    doc.sentences().forEach(sent => {
      console.log('parse', sent.parse());
      console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
    });
  })
  .catch(err => {
    console.log('err', err);
  });
