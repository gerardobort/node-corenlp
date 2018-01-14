import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';

/**
 * @class
 * @classdesc Class representing an CorefAnnotator.
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, coref
 * @see {@link https://stanfordnlp.github.io/CoreNLP/coref.html|CorefAnnotator}
 */
class CorefAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'coref',
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

export default CorefAnnotator;
