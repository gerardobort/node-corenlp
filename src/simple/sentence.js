import Annotable, { Tokenize, Lemma, Parse, DepParse } from './annotable';
import Token from './token';
import Governor from './governor';
import _ from 'lodash';

export default class Sentence extends Annotable {
  constructor(text) {
    super(text);
    this._tokens = [];
    this._governors = [];
    this._features = [];
  }

  parse() {
    return this._parse;
  }

  toString() {
    return this._text || this._tokens.map(token => token.toString()).join(' ');
  }

  words() {
    if (!this.hasAnnotator(Tokenize)) {
      throw new Error('Asked for words on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens.map(token => token.word());
  }

  word(index) {
    if (!this.hasAnnotator(Tokenize)) {
      throw new Error('Asked for a word on Sentence, but there are unmet annotator dependencies.');
    }
    return this._tokens[index].word();
  }

  [Symbol.iterator]() {
    return this._tokens.values();
  }

  posTags() {
  }

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

  nerTags() {
  }

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

  incommingDependencyLabel(index) {
  }

  natlogPolarities() {
  }

  natlogPolarity(index) {
  }

  openie() {
  }

  openieTriples(index) {
  }

  /**
   *
   * @returns {SentenceAlgorithms}
   */
  algorithms() {
  }

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
      this._governors = sentence.basicDependencies.map(gov => new Governor(gov.dep, this._tokens[gov.governor-1], this._tokens[gov.dependent-1]));
      // from: relation annotator: basicDependencies, enhancedDependencies, enhancedPlusPlusDependencies
      this._basicDependencies = sentence.basicDependencies;
      this._enhancedDependencies = sentence.enhancedDependencies;
      this._enhancedPlusPlusDependencies = sentence.enhancedPlusPlusDependencies;
    }
    return this;
  }
}

/**
 * @typedef Sentence
 * @property {number} index
 * @property {Array.<Token>} tokens
 */
Sentence.fromJson = function (data, isSentence = false) {
  const instance = new this();
  return instance.fromJson(data, isSentence);
};
