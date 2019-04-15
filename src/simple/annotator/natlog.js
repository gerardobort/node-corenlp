import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';
import MorphaAnnotator from './lemma';
import DependencyParseAnnotator from './depparse';

/**
 * @class
 * @classdesc Class representing an Natural Logic Annotator.
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos, lemma, depparse (Can also use parse)
 * @see {@link https://stanfordnlp.github.io/CoreNLP/natlog.html|NaturalLogicAnnotator}
 */
class NaturalLogicAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'natlog',
      {
        // dopolarity: True by default. If set to false, the annotator will only annotate quantifiers and quantifier scopes, and not annotate the polarity of each token
        ...options,
      },
      [
        new TokenizerAnnotator(),
        new WordsToSentenceAnnotator(),
        new POSTaggerAnnotator(),
        new MorphaAnnotator(),
        new DependencyParseAnnotator(),
      ],
    );
  }
}

export default NaturalLogicAnnotator;
