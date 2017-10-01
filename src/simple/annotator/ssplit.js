import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';

/**
 * @class
 * @classdesc Class representing an WordsToSentenceAnnotator.
 *            Combines multiple {@link Token}s into sentences
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit
 * @see {@link https://stanfordnlp.github.io/CoreNLP/ssplit.html|WordsToSentenceAnnotator}
 */
class WordsToSentenceAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'ssplit',
      {
        eolonly: false,
        isOneSentence: false,
        newlineIsSentenceBreak: 'never',
        boundaryMultiTokenRegex: null,
        boundaryTokenRegex: '\\.|[!?]+',
        boundariesToDiscard: null,
        htmlBoundariesToDiscard: null,
        tokenPatternsToDiscard: null,
        boundaryFollowersRegex: null,
        ...options,
      },
      [
        new TokenizerAnnotator(),
      ],
    );
  }
}

export default WordsToSentenceAnnotator;
