import ExpressionSentenceMatch from './expression-sentence-match';

/**
 * Class representing an ExpressionSentence.
 */
export default class ExpressionSentence {
  /**
   * Create an ExpressionSentence
   * @param {Array.<ExpressionSentenceMatch>} matches
   */
  constructor(matches) {
    this._matches = matches;
  }

  /**
   * Retrieves all the contained ExpressionSentenceMatch instances
   * @returns {Array.<ExpressionSentenceMatch>} matches
   */
  matches() {
    return this._matches;
  }

  /**
   * Retrieves a ExpressionSentenceMatch at the index specified
   * @param {number} index
   * @returns {ExpressionSentenceMatch} match
   */
  match(index) {
    return this._matches[index];
  }

  /**
   * Hydrates the current ExpressionSentence match groups with Token objects.
   * @description
   * The Expression / ExpressionSentence objects comes from outside the standard CoreNLP pipelines.
   * This mean that neither `TokensRegex`, `Semgrex` nor `Tregex` will tag the nodes with POS,
   * lemma, NER or any otehr annotation data.  This is sometimes a usful resource to count with, if
   * you can apart of getting the matching groups, get the annotated tokens for each word in the
   * match group.
   * @returns {ExpressionSentence} instance = The current instance
   */
  mergeTokensFromSentence(sentence) {
    const findToken = group => sentence.tokens().find(token =>
      // match group attributes with token attributes
      token.index() === group.begin + 1
          && token.toString() === group.text);

    this.matches()
      .forEach(match =>
        match.groups().forEach((group) => {
          // eslint-disable-next-line no-param-reassign
          group.token = findToken(group) || group.token;
        }));
    return this;
  }

  /**
   * Update an instance of ExpressionSentence with data provided by a JSON
   * @param {ExpressionSentenceJSON} data - The expression data, as returned by CoreNLP API service
   * @returns {ExpressionSentenceJSON} sentence - The current sentence instance
   */
  fromJson(data) {
    this._matches = Object.keys(data)
      .filter(matchIndex => matchIndex !== 'length')
      .map(matchIndex => ExpressionSentenceMatch.fromJson(data[matchIndex]));
    return this;
  }

  toJSON() {
    return [...this._matches];
  }

  /**
   * Get an instance of ExpressionSentence from a given JSON of sentence matches
   * @param {ExpressionSentenceJSON} data - The sentence data, as returned by CoreNLP API service
   * @returns {ExpressionSentence} sentence - A new ExpressionSentence instance
   */
  static fromJson(data) {
    const instance = new this();
    return instance.fromJson(data);
  }
}
