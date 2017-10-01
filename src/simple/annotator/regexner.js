import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';

/**
 * @class
 * @classdesc Class representing an RegexNERAnnotator.
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos, regexner
 * @see {@link https://stanfordnlp.github.io/CoreNLP/regexner.html|RegexNERAnnotator}
 */
class RegexNERAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'regexner',
      {
        validpospattern: '(([ner:PERSON]*) /es/ /una/ /buena/ /persona/)',
        // ignorecase: null,
        // mapping: null,
        // mapping.header: null,
        // mapping.field.<fieldname>: null,
        // commonWords: null,
        // backgroundSymbol: null,
        // posmatchtype: null,
        // validpospattern: null,
        // noDefaultOverwriteLabels: null,
        verbose: true,
        ...options,
      },
      [
        new TokenizerAnnotator(),
        new WordsToSentenceAnnotator(),
      ],
    );
  }
}

export default RegexNERAnnotator;
