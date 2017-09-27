/**
 * @typedef ExpressionSentenceMatchGroup
 * @property {string} label - group label
 * @property {number} begin - 0-based index of the matched group, relative to the given text
 * @property {number} end - 0-based index of the matched group, relative to the given text
 * @property {Token} [token] - onluy given if aggregated with an annotated Sentence or Document
 * @property {ExpressionSentenceMatchGroup} $[label] - other groups inside
 */

/**
 * A ExpressionSentenceMatch of either `TokensRegex`, `Semrgex` or `Tregex`.
 * @typedef ExpressionSentenceMatchJSON
 * @property {number} begin - word begin position, starting from zero
 * @property {number} end - word end position, starting from zero (no match ends at 0)
 * @property {string} text - matched text
 * @property {string} $[label] - any label, as defined in the expression pattern
 */
export default class ExpressionSentenceMatch {
  /**
   * Returns the main and labeled groups as a list of ExpressionSentenceMatchGroup
   * @returns {Array.<ExpressionSentenceMatchGroup>} groups
   */
  groups() {
    return [this._data]
      .concat(this.labels().map(label => this.group(label)));
  }

  /**
   * Returns the labeled group as ExpressionSentenceMatchGroup from a given label
   * @description
   * Nodes in a Macthed expression can be named, we call them groups here, and
   * the labels are the name of the nodes.
   * @see {@link https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexPattern.html#Naming_nodes}
   * @param {string} label - The label name, not prefixed wih $
   * @returns {ExpressionSentenceMatchGroup} group
   */
  group(label) {
    return this._data[`$${label}`];
  }

  /**
   * Retrieves the list of labels (aliases) available for the current sentence match.
   * @description
   * Labels are those aliases you can add to a group match expression, for example,
   * in Semgrex, you can do {ner:/PERSON/=good_guy}, from where "good_guy" would be the label
   * and internally it will come as $good_guy as a member of {@link ExpressionSentenceMatchGroup}.
   * @returns {Array.<string>} labels
   */
  labels() {
    return Object.keys(this._data)
      .filter(key => /^\$/.test(key))
      .map(label => label.substr(1));
  }

  /**
   * Update an instance of ExpressionSentenceMatch with data provided by a JSON
   * @param {ExpressionSentenceMatchJSON} data - The match data, as returned by CoreNLP API service
   * @returns {ExpressionSentenceMatch} expression - The current match instance
   */
  fromJson(data) {
    this._data = data;
    return this;
  }

  toJSON() {
    return { ...this._data };
  }

  /**
   * Get an instance of ExpressionSentenceMatch from a given JSON
   * @param {ExpressionSentenceMatchJSON} data - The match data, as returned by CoreNLP API service
   * @returns {ExpressionSentenceMatch} match - A new ExpressionSentenceMatch instance
   */
  static fromJson(data) {
    const instance = new this();
    return instance.fromJson(data);
  }
}
