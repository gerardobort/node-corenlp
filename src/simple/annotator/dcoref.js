import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';
import WordsToSentenceAnnotator from './ssplit';
import POSTaggerAnnotator from './pos';
import MorphaAnnotator from './lemma';
import NERClassifierCombiner from './ner';
import ParserAnnotator from './parse';

/**
 * @class
 * @classdesc Class representing an DeterministicCorefAnnotator.
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires tokenize, ssplit, pos, lemma, ner, parse, dcoref
 * @see {@link https://stanfordnlp.github.io/CoreNLP/coref.html|DeterministicCorefAnnotator}
 */
class DeterministicCorefAnnotator extends Annotator {
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
        new TokenizerAnnotator(),
        new WordsToSentenceAnnotator(),
        new POSTaggerAnnotator(),
        new MorphaAnnotator(),
        new NERClassifierCombiner(),
        new ParserAnnotator(),
      ],
    );
  }
}

export default DeterministicCorefAnnotator;
