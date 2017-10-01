import Annotator from '../annotator';

/**
 * Class representing an TokenizerAnnotator.
 * @extends Annotator
 * requirements: tokenize
 * @external TokenizerAnnotator
 * Identifies {@link Token}s
 * @see {@link https://stanfordnlp.github.io/CoreNLP/tokenize.html|TokenizerAnnotator}
 */
export default class TokenizerAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'tokenize',
      {
        language: 'Unspecified',
        // class: null, // throws error on CoreNLP server
        whitespace: false,
        keepeol: false,
        // options: null, // throws error on CoreNLP server
        verbose: false,
        ...options,
      }
    );
  }
}
