import SimpleCoreNLP from '../src';
import { ParserAnnotator } from '../src/simple/annotator';

SimpleCoreNLP.setup(null, 'Spanish');
const sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
sent.applyAnnotator(ParserAnnotator)
  .then(() => {
    console.log('parse', sent.parse());
    console.log(SimpleCoreNLP.Tree.fromSentence(sent).dump());
  })
  .catch(err => {
    console.log('err', err);
  });
