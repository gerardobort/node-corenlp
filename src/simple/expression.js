import Annotable from './annotable';
import Annotator from './annotator';
import ExpressionSentence from './expression-sentence';

export class TokensRegexAnnotator extends Annotator { }
export class SemgrexAnnotator extends Annotator { }
export class TregexAnnotator extends Annotator { }

/**
 * The CoreNLP API JSON structure representing an expression
 * This expression structure can be found as the output of `TokensRegex`,
 * `Semgrex` and `Tregex`.
 * @typedef ExpressionJSON
 * @property {number} index
 * @property {Array.<Array.<ExpressionSentenceMatch>>} sentences
 */

/**
 * @class
 * @classdesc Class representing an Expression
 * @extends Annotable
 * @memberof CoreNLP/simple
 */
class Expression extends Annotable {
  /**
   * Create an Expression
   * @param {string} text
   * @param {string} pattern - Either `TokensRegex`, `Semgrex` or `Tregex` valid pattern
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
    return this._text;
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
   * @returns {Array.<ExpressionSentence>} sentences - The expression sentences
   */
  sentences() {
    return this._sentences;
  }

  /**
   * Get the sentence for a given index
   * @param {number} index - The position of the sentence to get
   * @returns {ExpressionSentence} sentence - An expression sentence
   */
  sentence(index) {
    return this.sentences()[index];
  }

  /**
   * Hydrate the Expression instance with Token objects from an annotated Document
   * @see {@link ExpressionSentence#mergeTokensFromSentence}
   * @param {Document} document - An annotated document from where to extract the tokens
   * @returns {Expression} expression - The current expression instance
   */
  mergeTokensFromDocument(document) {
    document.sentences().forEach((sentence, i) =>
      this.sentence(i).mergeTokensFromSentence(sentence));
    return this;
  }

  /**
   * Update an instance of Expression with data provided by a JSON
   * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
   * @returns {Expression} expression - The current expression instance
   */
  fromJSON(data) {
    if (data.sentences) {
      this._sentences = data.sentences
        .map(sent => ExpressionSentence.fromJSON(sent));
    }
    return this;
  }

  toJSON() {
    return {
      text: this._text,
      sentences: this._sentences, // TODO this._sentences is an array of array of objects
    };
  }

  /**
   * Get an instance of Expression from a given JSON
   * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
   * @returns {Expression} expression - A new Expression instance
   */
  static fromJSON(data) {
    const instance = new this();
    return instance.fromJSON(data);
  }
}

export default Expression;
