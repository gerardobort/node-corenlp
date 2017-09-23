import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';

/**
 * Class representing an MorphaAnnotator.
 * @extends Annotator
 * requirements: tokenize, ssplit, pos, lemma
 * @external MorphaAnnotator
 * Hydrates {@link Token.lemma()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/lemma.html|MorphaAnnotator}
 */
export default class MorphaAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'lemma',
      {
        ...options,
      },
      [
        new TokenizerAnnotator(),
        new WordsToSentenceAnnotator(),
        new POSTaggerAnnotator(),
      ],
    );
  }
}
