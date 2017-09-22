import CoreNLP from '../src';

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

const props = new CoreNLP.Properties();
props.setProperty('annotators', 'tokenize,ssplit,pos,lemma,ner,parse');
const sent = new CoreNLP.simple.Sentence('Juan Carlos es una buena persona');
const pipeline = new CoreNLP.Pipeline(props, 'Spanish');

pipeline.annotate(sent)
  .then((sent) => {
    console.log('parse', sent);
  })
  .catch(err => {
    console.log('err', err);
  });
