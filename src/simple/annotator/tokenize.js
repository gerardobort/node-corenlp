import Annotator from '../annotator';

/**
 * @class
 * @classdesc Class representing an TokenizerAnnotator. Identifies {@link Token}s
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize
 * @see {@link https://stanfordnlp.github.io/CoreNLP/tokenize.html|TokenizerAnnotator}
 */
class TokenizerAnnotator extends Annotator {
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
      },
    );
  }
}

export default TokenizerAnnotator;
