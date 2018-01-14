import Service from '../service';
import Annotable from './annotable';

// @see {@link https://github.com/stanfordnlp/CoreNLP/blob/master/src/edu/stanford/nlp/simple/Token.java}

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
 * @typedef PosInfo
 * @description
 * PosInfo does not come as part of the CoreNLP.  It is an indexed reference of POS tags
 * by language provided by this library.  It's only helpful for analysis and study.  The
 * data was collected from different documentation resources on the Web.
 * The PosInfo may vary depending on the POS annotation types used, for example, CoreNLP
 * for Spanish uses custom POS tags developed by Stanford, but this can also be changed
 * to Universal Dependencies, which uses different tags.
 * @property {string} group
 * @property {string} tag
 * @property {Array.<string>} examples
 */

/**
 * @class
 * @classdesc Class representing a Token
 * @extends Annotable
 * @memberof CoreNLP/simple
 */
class Token extends Annotable {
  /**
   * Create a Token
   * @param {string} word
   */
  // eslint-disable-next-line no-useless-constructor
  constructor(word) {
    super(word);
  }

  /**
   * Get a string representation
   * @returns {string} token
   */
  toString() {
    return this._text;
  }

  /**
   * Get the `inde ` number associated by the StanfordCoreNLP
   * This index is relative to the sentence it belongs to, and is a 1-based (possitive integer).
   * This number is useful to match tokens within a sentence for depparse, coreference, etc.
   * @returns {number} index
   */
  index() {
    return this._index;
  }

  /**
   * Get the original word
   * @returns {string} word
   */
  word() {
    return this._text;
  }

  /**
   * Get the original text
   * @returns {string} originalText
   */
  originalText() {
    return this._originalText;
  }

  /**
   * Get the characterOffsetBegin relative to the parent sentence
   * @description
   * A 0-based index of the word's initial character within the sentence
   * @returns {number} characterOffsetBegin
   */
  characterOffsetBegin() {
    return this._characterOffsetBegin;
  }

  /**
   * Get the characterOffsetEnd relative to the parent sentence
   * A 0-based index of the word's ending character within the sentence
   * @returns {number} characterOffsetEnd
   */
  characterOffsetEnd() {
    return this._characterOffsetEnd;
  }

  /**
   * Get the `before` string relative to the container sentence
   * @returns {string} before
   */
  before() {
    return this._before;
  }

  /**
   * Get the `after` string relative to the container sentence
   * @returns {string} after
   */
  after() {
    return this._after;
  }

  /**
   * Get the annotated lemma
   * @returns {string} lemma
   */
  lemma() {
    return this._lemma;
  }

  /**
   * Get the annotated part-of-speech for the current token
   * @returns {string} pos
   */
  pos() {
    return this._pos;
  }

  /**
   * Get additional metadata about the POS annotation
   * NOTE: Do not use this method other than just for study or analysis purposes.
   * @see {@link PosInfo} for more details
   * @returns {PosInfo} posInfo
   */
  posInfo() {
    return Service.getTokenPosInfo(this._pos, this.getLanguageISO());
  }

  /**
   * Get the annotated named-entity for the current token
   * @returns {string} ner
   */
  ner() {
    return this._ner;
  }

  /**
   * Get the annotated speaker for the current token
   * @see {@link CorefAnnotator}
   * @returns {string} speaker
   */
  speaker() {
    return this._speaker;
  }

  /**
   * Get a JSON representation of the current token
   * @description
   * The following arrow function `data => Token.fromJSON(data).toJSON()` is idempontent, if
   * considering shallow comparison, not by reference.
   * This JSON will respects the same structure as it expects from {@see Token#fromJSON}.
   * @returns {TokenJSON} data
   */
  toJSON() {
    return {
      index: this._index,
      word: this._text,
      originalText: this._originalText,
      characterOffsetBegin: this._characterOffsetBegin,
      characterOffsetEnd: this._characterOffsetEnd,
      before: this._before,
      after: this._after,
      // annotations metadata
      pos: this._pos,
      lemma: this._lemma,
      ner: this._ner,
      speaker: this._speaker,
    };
  }

  /**
   * Get an instance of Token from a given JSON
   * @param {TokenJSON} data - The token data, as returned by CoreNLP API service
   * @returns {Token} token - A new Token instance
   */
  static fromJSON(data) {
    const instance = new this();
    instance._index = data.index;
    instance._text = data.word;
    instance._originalText = data.originalText;
    instance._characterOffsetBegin = data.characterOffsetBegin;
    instance._characterOffsetEnd = data.characterOffsetEnd;
    instance._before = data.before;
    instance._after = data.after;
    // annotations metadata
    instance._pos = data.pos;
    instance._lemma = data.lemma;
    instance._ner = data.ner;
    instance._speaker = data.speaker;
    return instance;
  }
}

export default Token;
