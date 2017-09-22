import _ from 'lodash';
import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';

/**
 * Class representing an POSTaggerAnnotator.
 * @extends Annotator
 * requirements: tokenize, ssplit, pos
 * @external POSTaggerAnnotator
 * Hydrates {@link Token.pos()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/pos.html|POSTaggerAnnotator}
 */
export default class POSTaggerAnnotator extends Annotator {
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
        TokenizerAnnotator,
        WordsToSentenceAnnotator,
      ]
    );
  }
}
