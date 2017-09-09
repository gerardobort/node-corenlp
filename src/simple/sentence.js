import _ from 'lodash';
import Annotable from './annotable';
import TokenizerAnnotator from './annotator/tokenize';
import MorphaAnnotator from './annotator/lemma';
import ParserAnnotator from './annotator/parse';
import DependencyParseAnnotator from './annotator/depparse';
import Token from './token';
import Governor from './governor';

/**
 * The CoreNLP API JSON structure representing a sentence
 * @typedef SentenceJSON
 * @property {number} index
 * @property {Array.<Token>} tokens
 */

/**
 * Class representing a Sentence (@see CoreNLP.Sentence).
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
    if (!this.hasAnnotator(TokenizerAnnotator)) {
      throw new Error('Asked for words on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens.map(token => token.word());
  }

  /**
   * Get a string representations of the Nth word of the sentence
   * @return {string} word
   */
  word(index) {
    if (!this.hasAnnotator(TokenizerAnnotator)) {
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
    if (!this.hasAnnotator(MorphaAnnotator)) {
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
    if (!this.hasAnnotator(DependencyParseAnnotator)) {
      throw new Error('Asked for governors on Sentence, but there are unmet annotator dependencies.');
    }
    return this._governors;
  }

  governor(index) {
    if (!this.hasAnnotator(DependencyParseAnnotator)) {
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
   * Get an array of token representations of the sentence words
   * @return {Array.<Token>} tokens
   */
  tokens() {
    if (!this.hasAnnotator(TokenizerAnnotator)) {
      throw new Error('Asked for tokens on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens;
  }

  /**
   * Get the Nth token of the sentence
   * @return {Token} token
   */
  token(index) {
    if (!this.hasAnnotator(TokenizerAnnotator)) {
      throw new Error('Asked for a token on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens[index];
  }

  /**
   *
   * @returns {SentenceAlgorithms}
   */
  // eslint-disable-next-line class-methods-use-this
  algorithms() {
  }

  toJSON() {
    return {
      text: this._text,
      tokens: this._tokens,
      governors: this._governors,
      parse: this._parse,
    };
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
      this.addAnnotator(TokenizerAnnotator);
      this._tokens = sentence.tokens.map(tok => Token.fromJson(tok));
    }
    if (sentence.parse) {
      this.addAnnotator(ParserAnnotator);
      this._parse = sentence.parse;
    }
    if (sentence.basicDependencies) {
      this.addAnnotator(DependencyParseAnnotator);
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
