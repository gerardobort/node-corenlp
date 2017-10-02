import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';

/**
 * @class
 * @classdesc Class representing an DependencyParseAnnotator. Hydrates {@link Sentence.governors()}
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos, lemma, ner, parse, depparse
 * @see {@link https://stanfordnlp.github.io/CoreNLP/depparse.html|DependencyParseAnnotator}
 */
class DependencyParseAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'depparse',
      {
        // model: null,
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

export default DependencyParseAnnotator;
