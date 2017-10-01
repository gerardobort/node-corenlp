import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';

/**
 * @class
 * @classdesc Class representing an POSTaggerAnnotator. Hydrates {@link Token.pos()}
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos
 * @see {@link https://stanfordnlp.github.io/CoreNLP/pos.html|POSTaggerAnnotator}
 */
class POSTaggerAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'pos',
      {
        ...options,
      },
      [
        new TokenizerAnnotator(),
        new WordsToSentenceAnnotator(),
      ],
    );
  }
}

export default POSTaggerAnnotator;
