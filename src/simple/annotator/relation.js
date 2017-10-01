import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';
import MorphaAnnotator from './lemma';
import NERClassifierCombiner from './ner';
import DependencyParseAnnotator from './depparse';

/**
 * @class
 * @classdesc Class representing an RelationExtractorAnnotator.
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos, lemma, ner, depparse, relation
 * @see {@link https://stanfordnlp.github.io/CoreNLP/relation.html|RelationExtractorAnnotator}
 */
class RelationExtractorAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'relation',
      {
        ...options,
      },
      [
        new TokenizerAnnotator(),
        new WordsToSentenceAnnotator(),
        new POSTaggerAnnotator(),
        new MorphaAnnotator(),
        new NERClassifierCombiner(),
        new DependencyParseAnnotator(),
      ],
    );
  }
}

export default RelationExtractorAnnotator;
