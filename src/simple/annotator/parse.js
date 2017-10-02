import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';

/**
 * @class
 * @class Class representing an ParserAnnotator. Hydrates {@link Token.parse()}
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos, lemma, ner, parse
 * @see {@link https://stanfordnlp.github.io/CoreNLP/parse.html|ParserAnnotator}
 */
class ParserAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'parse',
      {
        // model: null,
        // maxlen: null,
        // flags: null,
        // originalDependencies: null,
        // kbest: null,
        // keepPunct: null,
        ...options,
      },
      [
        new TokenizerAnnotator(),
        new WordsToSentenceAnnotator(),
      ],
    );
  }
}

export default ParserAnnotator;
