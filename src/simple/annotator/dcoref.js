import _ from 'lodash';
import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';
import MorphaAnnotator from './lemma';
import NERClassifierCombiner from './ner';
import ParserAnnotator from './parse';
import DependencyParseAnnotator from './depparse';
import RelationExtractorAnnotator from './relation';

/**
 * Class representing an DeterministicCorefAnnotator.
 * @extends Annotator
 * requirements: tokenize, ssplit, pos, lemma, ner, parse, dcoref
 * @external DeterministicCorefAnnotator
 * TODO ??
 * @see {@link https://stanfordnlp.github.io/CoreNLP/coref.html|DeterministicCorefAnnotator}
 */
export default class DeterministicCorefAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'dcoref',
      {
        ...options,
      },
      [
        TokenizerAnnotator,
        WordsToSentenceAnnotator,
        POSTaggerAnnotator,
        MorphaAnnotator,
        NERClassifierCombiner,
        ParserAnnotator,
        DependencyParseAnnotator,
        RelationExtractorAnnotator,
      ]
    );
  }
}
