import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';

/**
 * @class
 * @classdesc Class representing an MorphaAnnotator. Hydrates {@link Token.lemma()}
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos, lemma
 * @see {@link https://stanfordnlp.github.io/CoreNLP/lemma.html|MorphaAnnotator}
 */
class MorphaAnnotator extends Annotator {
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

export default MorphaAnnotator;
