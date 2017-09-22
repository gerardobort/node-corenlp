import _ from 'lodash';
import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';
import MorphaAnnotator from './lemma';
import NERClassifierCombiner from './ner';
import ParserAnnotator from './parse';

/**
 * Class representing an DependencyParseAnnotator.
 * @extends Annotator
 * requirements: tokenize, ssplit, pos, lemma, ner, parse, depparse
 * @external DependencyParseAnnotator
 * Hydrates {@link Sentence.governors()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/depparse.html|DependencyParseAnnotator}
 */
export default class DependencyParseAnnotator extends Annotator {
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
        TokenizerAnnotator,
        WordsToSentenceAnnotator,
        POSTaggerAnnotator,
        MorphaAnnotator,
        NERClassifierCombiner,
        ParserAnnotator,
      ]
    );
  }
}
