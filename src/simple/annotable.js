import _ from 'lodash';
import Service from './service';

export class Annotator {
  constructor(name, dependencies = []) {
    this._name = name;
    this._dependencies = dependencies;
  }

  toString() {
    return this._name;
  }

  dependencies() {
    return this._dependencies
  }

  pipeline() {
    return this._dependencies.concat([this])
      .map(annotator => annotator.toString());
  }
}

export const Tokenize = new Annotator('tokenize');
export const SSplit = new Annotator('ssplit', [Tokenize]);
export const POS = new Annotator('pos', [Tokenize, SSplit]);
export const Lemma = new Annotator('lemma', [Tokenize, SSplit, POS]);
export const NER = new Annotator('ner', [Tokenize, SSplit, POS, Lemma]);
export const Parse = new Annotator('parse', [Tokenize, SSplit, POS, Lemma, NER]);
export const DepParse = new Annotator('depparse', [Tokenize, SSplit, POS, Lemma, NER, Parse]);
export const Relation = new Annotator('relation', [Tokenize, SSplit, POS, Lemma, NER, Parse, DepParse]);

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
    this.fromJson(await Service.getAnnotationData(this._text, annotator.pipeline()));
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
