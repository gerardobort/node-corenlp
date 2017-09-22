import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';

/**
 * Class representing an WordsToSentenceAnnotator.
 * @extends Annotator
 * requirements: tokenize, ssplit
 * @external WordsToSentenceAnnotator
 * Combines multiple {@link Token}s into sentences
 * @see {@link https://stanfordnlp.github.io/CoreNLP/ssplit.html|WordsToSentenceAnnotator}
 */
export default class WordsToSentenceAnnotator extends Annotator {
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
