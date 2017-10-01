import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';

/**
 * Class representing an ParserAnnotator.
 * @extends Annotator
 * requirements: tokenize, ssplit, pos, lemma, ner, parse
 * @external ParserAnnotator
 * Hydrates {@link Token.parse()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/parse.html|ParserAnnotator}
 */
export default class ParserAnnotator extends Annotator {
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
      ]
    );
  }
}
