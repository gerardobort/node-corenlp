import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';
import MorphaAnnotator from './lemma';
import NERClassifierCombiner from './ner';
import DependencyParseAnnotator from './depparse';

/**
 * Class representing an RelationExtractorAnnotator.
 * @extends Annotator
 * requirements: tokenize, ssplit, pos, lemma, ner, parse, depparse, relation
 * @external RelationExtractorAnnotator
 * TODO ??
 * @see {@link https://stanfordnlp.github.io/CoreNLP/relation.html|RelationExtractorAnnotator}
 */
export default class RelationExtractorAnnotator extends Annotator {
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
