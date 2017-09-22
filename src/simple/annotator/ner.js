import _ from 'lodash';
import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';
import MorphaAnnotator from './lemma';

/**
 * Class representing an NERClassifierCombiner.
 * @extends Annotator
 * requirements: tokenize, ssplit, pos, lemma, ner
 * @external NERClassifierCombiner
 * Hydrates {@link Token.ner()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/ner.html|NERClassifierCombiner}
 */
export default class NERClassifierCombiner extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'ner',
      {
        useSUTime: true,
        // model: null, // throws error on CoreNLP server
        applyNumericClassifiers: true,
        // TODO resolve different options namespaces
        // sutime.markTimeRanges: false,
        // sutime.includeRange: false.
        ...options,
      },
      [
        TokenizerAnnotator,
        WordsToSentenceAnnotator,
        POSTaggerAnnotator,
        MorphaAnnotator,
      ]
    );
  }
}
