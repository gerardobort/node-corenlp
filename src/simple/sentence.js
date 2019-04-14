import head from 'lodash.head';
import Annotable from './annotable';
import TokenizerAnnotator from './annotator/tokenize';
import ParserAnnotator from './annotator/parse';
import NaturalLogicAnnotator from './annotator/natlog';
import OpenIEAnnotator from './annotator/openie';
import DependencyParseAnnotator from './annotator/depparse';
import Token from './token';
import Governor from './governor';


/**
 * The CoreNLP API JSON structure representing a sentence
 * @typedef SentenceJSON
 * @property {number} index - 1-based index, as they come indexed by StanfordCoreNLP
 * @property {Array.<Token>} tokens
 */

/**
 * @class
 * @classdesc Class representing a Sentence
 * @extends Annotable
 * @memberof CoreNLP/simple
 * @see {@link https://github.com/stanfordnlp/CoreNLP/blob/master/src/edu/stanford/nlp/simple/Sentence.java}
 */
class Sentence extends Annotable {
  /**
   * Create a Sentence
   * @param {string} text
   */
  constructor(text) {
    super(text);
    this._tokens = [];
    this._governors = [];
    this._openie = [];
    this._natLogPolarities = [];
  }

  /**
   * Get a string representation
   * @returns {string} sentence
   */
  toString() {
    return this._text || this._tokens.map(token => token.toString()).join(' ');
  }

  /**
   * Get the index relative to the parent document
   * @returns {number} index
   */
  index() {
    return this._index;
  }

  /**
   * Get a string representation of the parse tree structure
   * @returns {string} parse
   */
  parse() {
    return this._parse;
  }

  /**
   * Get an array of string representations of the sentence words
   * @requires {@link TokenizerAnnotator}
   * @throws {Error} in case the require annotator was not applied to the sentence
   * @returns {Array.<string>} words
   */
  words() {
    if (!this.hasAnnotator(TokenizerAnnotator)) {
      throw new Error('Asked for words on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens.map(token => token.word());
  }

  /**
   * Get a string representations of the Nth word of the sentence
   * @requires {@link TokenizerAnnotator}
   * @throws {Error} in case the require annotator was not applied to the sentence
   * @throws {Error} in case the token for the given index does not exists
   * @param {number} index - 0-based index as they are arranged naturally
   * @returns {string} word
   */
  word(index) {
    if (!this.hasAnnotator(TokenizerAnnotator)) {
      throw new Error('Asked for a word on Sentence, but there are unmet annotator dependencies.');
    }
    if (!this._tokens[index]) {
      throw new Error(`Sentence instance does not contain a token with index ${index}`);
    }
    return this._tokens[index].word();
  }

  [Symbol.iterator]() {
    return this._tokens.values();
  }

  /**
   * Get a string representations of the tokens part of speech of the sentence
   * @returns {Array.<string>} posTags
   */
  posTags() {
    return this._tokens.map(token => token.pos());
  }

  /**
   * Get a string representations of the Nth token part of speech of the sentence
   * @throws {Error} in case the token for the given index does not exists
   * @param {number} index - 0-based index as they are arranged naturally
   * @returns {string} posTag
   */
  posTag(index) {
    if (!this._tokens[index]) {
      throw new Error(`Sentence instance does not contain a token with index ${index}`);
    }
    return this._tokens[index].pos();
  }

  /**
   * Get a string representations of the tokens lemmas of the sentence
   * @returns {Array.<string>} lemmas
   */
  lemmas() {
    return this._tokens.map(token => token.lemma());
  }

  /**
   * Get a string representations of the Nth token lemma of the sentence
   * @throws {Error} in case the token for the given index does not exists
   * @param {number} index - 0-based index as they are arranged naturally
   * @returns {string} lemma
   */
  lemma(index) {
    if (!this._tokens[index]) {
      throw new Error(`Sentence instance does not contain a token with index ${index}`);
    }
    return this._tokens[index].lemma();
  }

  /**
   * Get a string representations of the tokens nerTags of the sentence
   * @returns {Array.<string>} nerTags
   */
  nerTags() {
    return this._tokens.map(token => token.ner());
  }

  /**
   * Get a string representations of the Nth token nerTag of the sentence
   * @throws {Error} in case the token for the given index does not exists
   * @param {number} index - 0-based index as they are arranged naturally
   * @returns {string} nerTag
   */
  nerTag(index) {
    if (!this._tokens[index]) {
      throw new Error(`Sentence instance does not contain a token with index ${index}`);
    }
    return this._tokens[index].ner();
  }

  /**
   * Get a list of annotated governors by the dependency-parser
   * @requires {@link DependencyParseAnnotator}
   * @throws {Error} in case the require annotator was not applied to the sentence
   * @returns {Array.<Governor>} governors
   */
  governors() {
    if (!this.hasAnnotator(DependencyParseAnnotator)) {
      throw new Error('Asked for governors on Sentence, but there are unmet annotator dependencies.');
    }
    return this._governors;
  }

  /**
   * Get the N-th annotated governor by the dependency-parser annotator
   * @requires {@link DependencyParseAnnotator}
   * @throws {Error} in case the require annotator was not applied to the sentence
   * @returns {Governor} governor
   */
  governor(index) {
    if (!this.hasAnnotator(DependencyParseAnnotator)) {
      throw new Error('Asked for a governor on Sentence, but there are unmet annotator dependencies.');
    }
    return this._governors[index];
  }

  // TODO
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  incommingDependencyLabel(index) {
  }

  natlogPolarities() {
    if (!this.hasAnnotator(NaturalLogicAnnotator)) {
      throw new Error('Asked for PolarityAnnotation on Sentence, but there are unmet annotator dependencies.');
    }
    return this._natLogPolarities;
  }

  // TODO
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  natlogPolarity(index) {
    if (!this.hasAnnotator(NaturalLogicAnnotator)) {
      throw new Error('Asked for a PolarityAnnotation on Sentence, but there are unmet annotator dependencies.');
    }
    return this._natLogPolarities[index];
  }

  // TODO
  // eslint-disable-next-line class-methods-use-this
  openie() {
    if (!this.hasAnnotator(OpenIEAnnotator)) {
      throw new Error('Asked for a OpenIE-Annotation on Sentence, but there are unmet annotator dependencies.');
    }
    return this._openie;
  }

  // TODO
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  openieTriples(index) {
  }

  /**
   * Get an array of token representations of the sentence words
   * @requires {@link TokenizerAnnotator}
   * @throws {Error} in case the require annotator was not applied to the sentence
   * @returns {Array.<Token>} tokens
   */
  tokens() {
    if (!this.hasAnnotator(TokenizerAnnotator)) {
      throw new Error('Asked for tokens on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens;
  }

  /**
   * Get the Nth token of the sentence
   * @requires {@link TokenizerAnnotator}
   * @throws {Error} in case the require annotator was not applied to the sentence
   * @returns {Token} token
   */
  token(index) {
    if (!this.hasAnnotator(TokenizerAnnotator)) {
      throw new Error('Asked for a token on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens[index];
  }

  // TODO
  // eslint-disable-next-line class-methods-use-this
  algorithms() {
  }

  /**
   * Sets the language ISO (given by the pipeline during the annotation process)
   * This is solely to keep track of the language chosen for further analysis
   * @return {string} text
   */
  setLanguageISO(iso) {
    super.setLanguageISO(iso);
    this._tokens.forEach(token => token.setLanguageISO(iso));
  }

  /**
   * Get a JSON representation of the current sentence
   * @description
   * The following arrow function `data => Sentence.fromJSON(data).toJSON()` is idempontent, if
   * considering shallow comparison, not by reference.
   * This JSON will respects the same structure as it expects from {@see Sentence#fromJSON}.
   * @returns {SentenceJSON} data
   */
  toJSON() {
    let json = {
      index: this._index,
      tokens: this._tokens.map(token => token.toJSON()),
      basicDependencies: this._governors.map(governor => governor.toJSON()),
      enhancedDependencies: this._enhancedDependencies,
      enhancedPlusPlusDependencies: this._enhancedPlusPlusDependencies,
    };

    if (this._parse) {
      json = { ...json, parse: this._parse };
    }
    return json;
  }

  /**
   * Update an instance of Sentence with data provided by a JSON
   * @param {SentenceJSON} data - The document data, as returned by CoreNLP API service
   * @param {boolean} [isSentence] - Indicate if the given data represents just the sentence
   * or a full document with just a sentence inside
   * @returns {Sentence} sentence - The current sentence instance
   */
  fromJSON(data, isSentence = false) {
    const sentence = isSentence ? data : head(data.sentences);
    this._index = data.index;
    if (sentence.tokens) {
      this.addAnnotator(TokenizerAnnotator);
      this._tokens = sentence.tokens.map(tok => Token.fromJSON(tok));
    }
    if (sentence.parse) {
      this.addAnnotator(ParserAnnotator);
      this._parse = sentence.parse;
    }
    if (sentence.openie) {
      this.addAnnotator(OpenIEAnnotator);
      this._openie = sentence.openie;
    }
    if (sentence.basicDependencies) {
      this.addAnnotator(DependencyParseAnnotator);
      this._governors = sentence.basicDependencies.map(gov =>
        new Governor(gov.dep, this._tokens[gov.dependent - 1], this._tokens[gov.governor - 1]));
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
  static fromJSON(data, isSentence = false) {
    const instance = new this();
    return instance.fromJSON(data, isSentence);
  }
}

export default Sentence;
