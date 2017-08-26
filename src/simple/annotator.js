import _ from 'lodash';

/**
 * Class representing an Annotatror.
 * @extends Annotator
 */
export default class Annotator {
  /**
   * Create an Annotator
   * @param {string} name
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   * @param {Array.<Annotator>} [dependencies]
   */
  constructor(name, options = {}, dependencies = []) {
    this._name = name;
    this._options = options;
    this._dependencies = dependencies;
  }

  /**
   * Get a string representation
   * @return {string} annotator
   */
  toString() {
    return this._name;
  }

  /**
   * Defines whether a given annotator is the same as current, using shallow compare.
   * This is useful for a Document or Sentence to validate if the minimum of annotators required
   * were already applied to them.  Allows at the same time the users to instantiate new annotators
   * and configure them as needed.
   * @param {Annotator} annotator
   * @return {boolean}
   */
  equalsTo(annotator) {
    return this._name === annotator.toString();
  }

  /**
   * Get an Object key-value representation of the annotor's options (excluding prefix)
   * @return {Object} options
   */
  options() {
    return this._options;
  }

  /**
   * Get/Set an option value
   * @param {string} key
   * @param {string|boolean} [value]
   * @return {string} value
   */
  option(key, value = null) {
    if (value === null) {
      return this._options[key];
    }
    this._options[key] = value;
    return value;
  }

  /**
   * Get a list of annotators dependencies
   * @return {Array.<Annotator>} dependencies
   */
  dependencies() {
    return this._dependencies;
  }

  /**
   * Get a list of annotators dependencies, following by this annotator, all this as
   * a list of strings
   * This is useful to fulfill the `annotators` param in CoreNLP API properties.
   * @return {Array.<string>} pipeline
   */
  pipeline() {
    return _.uniq(
      _.flatten(
        this.dependencies()
          .map(annotator => annotator.pipeline()),
      )
        .concat([this.toString()]),
    );
  }

  /**
   * Get an object of all the Annotator options including the current and all its 
   * dependencies, prefixed by the annotator names
   * This is useful to fulfill the options params in CoreNLP API properties.
   * @return {Array.<string>} pipelineOptions
   */
  pipelineOptions() {
    return _.reduce(
      this.dependencies().map(annotator => annotator.pipelineOptions())
        .concat(Object.keys(this.options()).map(opt => ({ [`${this}.${opt}`]: this.option(opt) }))),
      (ac, option) => ({ ...ac, ...option }),
      {},
    );
  }
}

// Predefined annotators @see {@link https://stanfordnlp.github.io/CoreNLP/annotators.html}

/**
 * TokenizerAnnotator
 * requirements: tokenize
 * @external TokenizerAnnotator
 * Identifies {@link Token}s
 * @see {@link https://stanfordnlp.github.io/CoreNLP/tokenize.html|TokenizerAnnotator}
 */
export const TokenizerAnnotator = new Annotator('tokenize', {
  language: 'Unspecified',
  // class: null, // throws error on CoreNLP server
  whitespace: false,
  keepeol: false,
  // options: null, // throws error on CoreNLP server
  verbose: false,
});

/**
 * WordsToSentenceAnnotator
 * requirements: tokenize, ssplit
 * @external WordsToSentenceAnnotator
 * Combines multiple {@link Token}s into sentences
 * @see {@link https://stanfordnlp.github.io/CoreNLP/ssplit.html|WordsToSentenceAnnotator}
 */
export const WordsToSentenceAnnotator = new Annotator('ssplit', {
  eolonly: false,
  isOneSentence: false,
  newlineIsSentenceBreak: 'never',
  boundaryMultiTokenRegex: null,
  boundaryTokenRegex: '\\.|[!?]+',
  boundariesToDiscard: null,
  htmlBoundariesToDiscard: null,
  tokenPatternsToDiscard: null,
  boundaryFollowersRegex: null,
}, [
  TokenizerAnnotator,
]);

/**
 * POSTaggerAnnotator
 * requirements: tokenize, ssplit, pos
 * @external POSTaggerAnnotator
 * Hydrates {@link Token.pos()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/pos.html|POSTaggerAnnotator}
 */
export const POSTaggerAnnotator = new Annotator('pos', {}, [
  TokenizerAnnotator,
  WordsToSentenceAnnotator,
]);

/**
 * MorphaAnnotator
 * requirements: tokenize, ssplit, pos, lemma
 * @external MorphaAnnotator
 * Hydrates {@link Token.lemma()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/lemma.html|MorphaAnnotator}
 */
export const MorphaAnnotator = new Annotator('lemma', {}, [
  TokenizerAnnotator,
  WordsToSentenceAnnotator,
  POSTaggerAnnotator,
]);

/**
 * NERClassifierCombiner
 * requirements: tokenize, ssplit, pos, lemma, ner
 * @external NERClassifierCombiner
 * Hydrates {@link Token.ner()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/ner.html|NERClassifierCombiner}
 */
export const NERClassifierCombiner = new Annotator('ner', {
  useSUTime: true,
  // model: null, // throws error on CoreNLP server
  applyNumericClassifiers: true,
  // TODO resolve different options namespaces
  // sutime.markTimeRanges: false,
  // sutime.includeRange: false.
}, [
  TokenizerAnnotator,
  WordsToSentenceAnnotator,
  POSTaggerAnnotator,
  MorphaAnnotator,
]);

/**
 * ParserAnnotator
 * requirements: tokenize, ssplit, pos, lemma, ner, parse
 * @external ParserAnnotator
 * Hydrates {@link Token.parse()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/parse.html|ParserAnnotator}
 */
export const ParserAnnotator = new Annotator('parse', {
  // model: null,
  // maxlen: null,
  // flags: null,
  // originalDependencies: null,
  // kbest: null,
  // keepPunct: null,
}, [
  TokenizerAnnotator,
  WordsToSentenceAnnotator,
  POSTaggerAnnotator,
  MorphaAnnotator,
  NERClassifierCombiner,
]);

/**
 * DependencyParseAnnotator
 * requirements: tokenize, ssplit, pos, lemma, ner, parse, depparse
 * @external DependencyParseAnnotator
 * Hydrates {@link Sentence.governors()}
 * @see {@link https://stanfordnlp.github.io/CoreNLP/depparse.html|DependencyParseAnnotator}
 */
export const DependencyParseAnnotator = new Annotator('depparse', {
  // model: null,
}, [
  TokenizerAnnotator,
  WordsToSentenceAnnotator,
  POSTaggerAnnotator,
  MorphaAnnotator,
  NERClassifierCombiner,
  ParserAnnotator,
]);

/**
 * RelationExtractorAnnotator
 * requirements: tokenize, ssplit, pos, lemma, ner, parse, depparse, relation
 * @external RelationExtractorAnnotator
 * TODO ??
 * @see {@link https://stanfordnlp.github.io/CoreNLP/relation.html|RelationExtractorAnnotator}
 */
export const RelationExtractorAnnotator = new Annotator('relation', {}, [
  TokenizerAnnotator,
  WordsToSentenceAnnotator,
  POSTaggerAnnotator,
  MorphaAnnotator,
  NERClassifierCombiner,
  ParserAnnotator,
  DependencyParseAnnotator,
]);

/**
 * DeterministicCorefAnnotator
 * requirements: tokenize, ssplit, pos, lemma, ner, parse
 * @external DeterministicCorefAnnotator
 * TODO ??
 * @see {@link https://stanfordnlp.github.io/CoreNLP/coref.html|DeterministicCorefAnnotator}
 */
export const DeterministicCorefAnnotator = new Annotator('dcoref', {}, [
  TokenizerAnnotator,
  WordsToSentenceAnnotator,
  POSTaggerAnnotator,
  MorphaAnnotator,
  NERClassifierCombiner,
  ParserAnnotator,
  DependencyParseAnnotator,
  RelationExtractorAnnotator,
]);
