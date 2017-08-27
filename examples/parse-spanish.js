import CoreNLP from '../src';

CoreNLP.setup('Spanish');
const sent = new CoreNLP.simple.Sentence('El pájaro veloz come kiwi.');
sent.applyAnnotator(CoreNLP.simple.annotator.ParserAnnotator)
  .then(() => {
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  })
  .catch(err => {
    console.log('err', err);
  });
