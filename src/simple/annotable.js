import _ from 'lodash';
import Service from './service';

/**
 * Class representing an Annotatror.
 * @extends Annotator
 */
export class Annotator {
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
    return this._options[key] = value;
  }

  /**
   * Get a list of annotators dependencies
   * @return {Array.<Annotator>} dependencies
   */
  dependencies() {
    return this._dependencies;
  }

  /**
   * Get a list of annotators dependencies, following by this annotator, all this as a list of strings
   * This is useful to fulfill the `annotators` param in CoreNLP API properties.
   * @return {Array.<string>} pipeline
   */
  pipeline() {
    return _.uniq(_.flatten(this.dependencies().map(annotator => annotator.pipeline())).concat([this.toString()]));
  }

  /**
   * Get a n object of all the Annotator options including the current and all its dependencies, prefixed by the annotator names
   * This is useful to fulfill the options params in CoreNLP API properties.
   * @return {Array.<string>} pipelineOptions
   */
  pipelineOptions() {
    return _.reduce(
      this.dependencies().map(annotator => annotator.pipelineOptions())
        .concat(Object.keys(this.options()).map(opt => ({ [`${this}.${opt}`]: this.option(opt) }))),
      (ac, option) => ({ ...ac, ...option }),
      {}
    );
  }
}

export const Tokenize = new Annotator('tokenize');
export const SSplit = new Annotator('ssplit', {}, [Tokenize]);
export const POS = new Annotator('pos', {}, [Tokenize, SSplit]);
export const Lemma = new Annotator('lemma', {}, [Tokenize, SSplit, POS]);
export const NER = new Annotator('ner', {}, [Tokenize, SSplit, POS, Lemma]);
export const Parse = new Annotator('parse', {}, [Tokenize, SSplit, POS, Lemma, NER]);
export const DepParse = new Annotator('depparse', {}, [Tokenize, SSplit, POS, Lemma, NER, Parse]);
export const Relation = new Annotator('relation', {}, [Tokenize, SSplit, POS, Lemma, NER, Parse, DepParse]);

export default class Annotable {
  constructor(text) {
    this._text = text;
    this._annotators = [];
  }

  // annotator should turn annotator, and let a single apply add all the dependencies at once
  addAnnotator(annotator) {
    this._annotators = _.uniq(this._annotators.concat([annotator]));
  }

  addAnnotators(annotators) {
    this._annotators = _.uniq(this._annotators.concat(annotators));
  }

  removeAnnotator(annotator) {
    this._annotators = _.difference(this._annotators, [annotator]);
  }

  hasAnnotator(annotator) {
    return !!_.find(this._annotators, annotator);
  }

  hasAnyAnnotator(annotators) {
    return _.intersection(this._annotators, annotators) > 0;
  }

  async applyAnnotator(annotator) {
    console.log('TEST', annotator.pipelineOptions());
    this.fromJson(await Service.getAnnotationData(this._text, annotator.pipeline(), annotator.pipelineOptions()));
    this.addAnnotators(annotator.dependencies());
    this.addAnnotator(annotator);
  }

  /**
   * requirements: tokenize
   * https://stanfordnlp.github.io/CoreNLP/ssplit.html
   * Adds sentences {string}
   * @returns {Promise.<SentencesAnnotation>} ssplit
   */
  async applySSplit() {
    await this.applyAnnotator(SSplit);
  }

  /**
   * requirements: tokenize, ssplit, pos, lemma
   * https://stanfordnlp.github.io/CoreNLP/lemma.html
   * Adds sentences.0.tokens.0.lemma {string}
   * @returns {Promise.<LemmaAnnotation>} lemma
   */
  async applyLemma() {
    await this.applyAnnotator(Lemma);
  }

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner
   * https://stanfordnlp.github.io/CoreNLP/ner.html
   * Adds sentences.0.tokens.0.ner {string}
   * @returns {Promise.<NERAnnotation>} ner
   */
  async applyNER() {
    await this.applyAnnotator(NER);
  }

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse
   * https://stanfordnlp.github.io/CoreNLP/parse.html
   * Adds sentences.parse {string} A tree-like structure describing the sentence as a single string
   * @returns {Promise.<ParseAnnotation>} parse
   */
  async applyParse() {
    await this.applyAnnotator(Parse);
  }

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse, depparse
   * https://stanfordnlp.github.io/CoreNLP/depparse.html
   * @returns {Promise.<DepParseAnnotation>} parse
   */
  async applyDepParse() {
    await this.applyAnnotator(DepParse);
  }

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse, depparse, relation
   * https://stanfordnlp.github.io/CoreNLP/relation.html
   * Adds basicDependencies, enhancedDependencies, enhancedPlusPlusDependencies
   * @returns {Promise.<RelationAnnotation>} relation
   */
  async applyRelation() {
    await this.applyAnnotator(Relation);
  }
}
