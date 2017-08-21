import _ from 'lodash';
import Annotable, { Tokenize, Lemma, Parse, DepParse } from './annotable';
import Token from './token';
import Governor from './governor';

/**
 * The CoreNLP API JSON structure representing a sentence
 * @typedef SentenceJSON
 * @property {number} index
 * @property {Array.<Token>} tokens
 */

/**
 * Class representing a Sentence (@see SimpleCoreNLP.Sentence).
 * @extends Annotable
 */
export default class Sentence extends Annotable {
  /**
   * Create a Sentence
   * @param {string} text
   */
  constructor(text) {
    super(text);
    this._tokens = [];
    this._governors = [];
    this._features = [];
  }

  /**
   * Get a string representation
   * @return {string} sentence
   */
  toString() {
    return this._text || this._tokens.map(token => token.toString()).join(' ');
  }

  /**
   * Get a string representation of the parse tree structure
   * @return {string} parse
   */
  parse() {
    return this._parse;
  }

  /**
   * Get an array of string representations of the sentence words
   * @return {Array.<string>} words
   */
  words() {
    if (!this.hasAnnotator(Tokenize)) {
      throw new Error('Asked for words on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens.map(token => token.word());
  }

  /**
   * Get a string representations of the Nth word of the sentence
   * @return {Arra.<string>} words
   */
  word(index) {
    if (!this.hasAnnotator(Tokenize)) {
      throw new Error('Asked for a word on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens[index].word();
  }

  [Symbol.iterator]() {
    return this._tokens.values();
  }

  // eslint-disable-next-line class-methods-use-this
  posTags() {
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  posTag(index) {
  }

  lemmas() {
    if (!this.hasAnnotator(Lemma)) {
      throw new Error('Asked for lemmas on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens.map(token => token.lemma());
  }

  async lemma(index) {
    return this._tokens[index].lemma();
  }

  // eslint-disable-next-line class-methods-use-this
  nerTags() {
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  nerTag(index) {
  }

  governors() {
    if (!this.hasAnnotator(DepParse)) {
      throw new Error('Asked for governors on Sentence, but there are unmet annotator dependencies.');
    }
    return this._governors;
  }

  governor(index) {
    if (!this.hasAnnotator(DepParse)) {
      throw new Error('Asked for a governor on Sentence, but there are unmet annotator dependencies.');
    }
    return this._governors[index];
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  incommingDependencyLabel(index) {
  }

  // eslint-disable-next-line class-methods-use-this
  natlogPolarities() {
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  natlogPolarity(index) {
  }

  // eslint-disable-next-line class-methods-use-this
  openie() {
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  openieTriples(index) {
  }

  /**
   *
   * @returns {SentenceAlgorithms}
   */
  // eslint-disable-next-line class-methods-use-this
  algorithms() {
  }

  /**
   * Update an instance of Sentence with data provided by a JSON
   * @param {SentenceJSON} data - The document data, as returned by CoreNLP API service
   * @param {boolean} [isSentence] - Indicate if the given data represents just the sentence
   * of a full document
   * @returns {Sentence} document - The current document instance
   */
  fromJson(data, isSentence = false) {
    const sentence = isSentence ? data : _.head(data.sentences);
    if (sentence.tokens) {
      this.addAnnotator(Tokenize);
      this._tokens = sentence.tokens.map(tok => Token.fromJson(tok));
    }
    if (sentence.parse) {
      this.addAnnotator(Parse);
      this._parse = sentence.parse;
    }
    if (sentence.basicDependencies) {
      this.addAnnotator(DepParse);
      this._governors = sentence.basicDependencies.map(gov =>
        new Governor(gov.dep, this._tokens[gov.governor - 1], this._tokens[gov.dependent - 1]));
      // @see relation annotator...
      this._basicDependencies = sentence.basicDependencies;
      this._enhancedDependencies = sentence.enhancedDependencies;
      this._enhancedPlusPlusDependencies = sentence.enhancedPlusPlusDependencies;
    }
    return this;
  }


  /**
   * Get an instance of Sentence from a given JSON
   * @param {SentenceJSON} data - The document data, as returned by CoreNLP API service
   * @param {boolean} [isSentence] - Indicate if the given data represents just the sentence of a
   * full document
   * @returns {Sentence} document - A new Sentence instance
   */
  static fromJson(data, isSentence = false) {
    const instance = new this();
    return instance.fromJson(data, isSentence);
  }
}
