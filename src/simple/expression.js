import Annotable from './annotable';
import Annotator from './annotator';

/**
 * A Match of either `TokensRegex`, `Semrgex` or `Tregex`.
 * @typedef Match
 * @property {number} begin - word begin position, starting from zero
 * @property {number} end - word end position, starting from zero (no match ends at 0)
 * @property {string} text - matched text
 * @property {string} $[label] - any label, as defined in the expression pattern
 */
export class Match {
  /**
   * Returns the text for the given labeled word
   * @param {string} labelName - The labeed name
   * @returns {string} text - The text that matched that label
   */
  label(labelName) {
    return this._data[`_${labelName}`];
  }

  /**
   * Update an instance of Expression with data provided by a JSON
   * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
   * @returns {Expression} expression - The current expression instance
   */
  fromJson(data) {
    this._data = data;
    return this;
  }

  toJSON() {
    return { ...this._data };
  }

  /**
   * Get an instance of Match from a given JSON
   * @param {MatchJSON} data - The match data, as returned by CoreNLP API service
   * @returns {Match} match - A new Match instance
   */
  static fromJson(data) {
    const instance = new this();
    return instance.fromJson(data);
  }
}

export class TokensRegexAnnotator extends Annotator { }
export class SemgrexAnnotator extends Annotator { }
export class TregexAnnotator extends Annotator { }

/**
 * The CoreNLP API JSON structure representing an expression
 * This expression structure can be found as the output of `TokensRegex`,
 * `Semrgex` and `Tregex`.
 * @typedef ExpressionJSON
 * @property {number} index
 * @property {Array.<Array.<Match>>} sentences
 */

/**
 * Class representing an Expression.
 * @extends Annotable
 */
export default class Expression extends Annotable {
  /**
   * Create an Expression
   * @param {string} text
   * @param {string} pattern - Either `TokensRegex`, `Semrgex` or `Tregex` valid pattern
   */
  constructor(text, pattern) {
    super(text);
    this._pattern = pattern;
    this._sentences = [];
  }

  /**
   * Get a string representation
   * @return {string} expression
   */
  toString() {
    return this._text || this._sentences.map(sent => sent.toString()).join('. ');
  }

  /**
   * Get the pattern
   * @returns {string} pattern - The expression pattern
   */
  pattern() {
    return this._pattern;
  }

  /**
   * Get a list of sentences
   * @returns {Array.<Sentence>} sentences - The expression sentences
   */
  sentences() {
    return this._sentences;
  }

  /**
   * Get the sentence for a given index
   * @param {number} index - The position of the sentence to get
   * @returns {Sentence} sentence - The expression sentences
   */
  sentence(index) {
    return this.sentences()[index];
  }

  /**
   * Update an instance of Expression with data provided by a JSON
   * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
   * @returns {Expression} expression - The current expression instance
   */
  fromJson(data) {
    if (data.sentences) {
      this._sentences = data.sentences.map(sent =>
        Object.keys(sent).map(matchIndex =>
          (matchIndex !== 'length' ? Match.fromJson(sent[matchIndex]) : false))
          .filter(Boolean));
    }
    return this;
  }

  toJSON() {
    return {
      text: this._text,
      sentences: this._sentences,
    };
  }

  /**
   * Get an instance of Expression from a given JSON
   * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
   * @returns {Expression} expression - A new Expression instance
   */
  static fromJson(data) {
    const instance = new this();
    return instance.fromJson(data);
  }
}
