import Service from './service';

/**
 * The CoreNLP API JSON structure representing a token
 * @typedef TokenJSON
 * @property {number} index
 * @property {string} word
 * @property {string} originalText
 * @property {number} characterOffsetBegin
 * @property {number} characterOffsetEnd
 * @property {string} before
 * @property {string} after
 */

/**
 * Class representing a Token
 */
export default class Token {
  /**
   * Create a Token
   * @param {string} word
   */
  constructor(word) {
    this._word = word;
  }

  /**
   * Get a string representation
   * @return {string} token
   */
  toString() {
    return this._word;
  }

  index() {
    return this._index;
  }

  word() {
    return this._word;
  }

  lemma() {
    return this._lemma;
  }

  pos() {
    return Service.getTokenPosInfo(this._pos);
  }

  parse() {
    return this._parse;
  }

  ner() {
    return this._ner;
  }

  /**
   * Get an instance of Token from a given JSON
   * @param {TokenJSON} data - The token data, as returned by CoreNLP API service
   * @returns {Token} token - A new Token instance
   */
  static fromJson(data) {
    const instance = new this();
    instance._index = data.index;
    instance._word = data.word;
    instance._originalText = data.originalText;
    instance._characterOffsetBegin = data.characterOffsetBegin;
    instance._characterOffsetEnd = data.characterOffsetEnd;
    instance._before = data.before;
    instance._after = data.after;
    // annotations metadata
    instance._pos = data.pos;
    instance._lemma = data.lemma;
    instance._ner = data.ner;
    return instance;
  }

}
