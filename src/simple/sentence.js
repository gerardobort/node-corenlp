import Connector from './connector';
import Token from './token';
import LemmaAnnotation from './lemma-annotation';

export default class Sentence {
  constructor(text) {
    this._text = text;
  }

  parse() {
  }

  toString() {
    return this._text || this.words().join(' ');
  }

  words() {
    return this._tokens.map(token => token.word());
  }

  word(index) {
    return this._tokens[index].word();
  }

  posTags() {
  }

  posTag(index) {
  }

  async lemmas() {
    this._lemmas = LemmaAnnotation.fromJson(
      (await Connector.lemma(this._text))
    );
    return this._lemmas;
  }

  lemma(index) {
  }

  nerTags() {
  }

  nerTag(index) {
  }

  governor() {
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
}

/**
 * @typedef Sentence
 * @property {number} index
 * @property {Array.<Token>} tokens
 */
Sentence.fromJson = function (data) {
  const instance = new this();
  instance._tokens = data.tokens.map(token => Token.fromJson(token));
  return instance;
};
