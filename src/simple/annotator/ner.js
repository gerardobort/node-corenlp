import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';

/**
 * @class
 * @classdesc Class representing an NERClassifierCombiner. Hydrates {@link Token.ner()}
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos, lemma, ner
 * @see {@link https://stanfordnlp.github.io/CoreNLP/ner.html|NERClassifierCombiner}
 */
class NERClassifierCombiner extends Annotator {
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
        new TokenizerAnnotator(),
        new WordsToSentenceAnnotator(),
      ],
    );
  }
}

export default NERClassifierCombiner;
