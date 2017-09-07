import CoreNLP from '../src';

CoreNLP.setup('Spanish');

// https://stanfordnlp.github.io/CoreNLP/regexner.html
const RegexNERAnnotator = new CoreNLP.simple.Annotator('regexner', {
    validpospattern: `(([ner:PERSON]*) /es/ /una/ /buena/ /persona/)`,
    //ignorecase: null,
    //mapping: null,
    //mapping.header: null,
    //mapping.field.<fieldname>: null,
    //commonWords: null,
    //backgroundSymbol: null,
    //posmatchtype: null,
    //validpospattern: null,
    //noDefaultOverwriteLabels: null,
    verbose: true,
  }, [
    CoreNLP.simple.annotator.NERClassifierCombiner,
  ]);

const sent = new CoreNLP.simple.Sentence('Juan Carlos es una buena persona');
sent.applyAnnotator(RegexNERAnnotator)
  .then(() => {
    //console.log('parse', sent);
  })
  .catch(err => {
    console.log('err', err);
  });
