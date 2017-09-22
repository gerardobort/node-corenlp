import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';

/**
 * Class representing an RegexNERAnnotator.
 * @extends Annotator
 * requirements: tokenize, ssplit, pos, lemma, ner
 * @external RegexNERAnnotator
 * TODO ??
 * @see {@link https://stanfordnlp.github.io/CoreNLP/regexner.html|RegexNERAnnotator}
 */
export default class RegexNERAnnotator extends Annotator {
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
