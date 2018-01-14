/**
 * A CorefMention.
 * @typedef CorefMentionJSON
 * @property {number} id - Mention ID
 * @property {string} text - The text (literal word) of the mention
 * @property {number} sentNum - 1-based index of the sentence containinng this mention
 * @property {number} headIndex - 1-based index
 * @property {number} startIndex - 1-based index
 * @property {number} endIndex - 1-based index
 * @property {boolean} isRepresentativeMention - Wehther the mention word is representative or not
 * @property {("ANIMATE"|"INANIMATE"|"UNKNOWN")} animacy - Mention's animacy
 * @property {("FEMALE"|"MALE"|"NEUTRAL"|"UNKNOWN")} gender - Gender of the mention
 * @property {("SINGULAR"|"PLURAL"|"UNKNOWN")} number - Cardinality of the mention
 * @property {("PRONOMINAL"|"NOMINAL"|"PROPER"|"LIST")} type - Mention type
 * @property {Array} position - Position is a binary tuple of 
 *    (sentence number, mention number in that sentence). This is used for indexing by mention.
 * 
 * @see {@link https://github.com/stanfordnlp/CoreNLP/blob/7cfaf869f9500da16b858ab1a2835234ae46f96e/src/edu/stanford/nlp/dcoref/CorefChain.java#L148}
 * @see {@link https://github.com/stanfordnlp/CoreNLP/blob/master/src/edu/stanford/nlp/dcoref/Dictionaries.java} for enum definitions
 */

/**
 * @class
 * @classdesc Class representing an CorefMention
 */
class CorefMention {
  /**
   * Retrieves the mention ID
   * @returns {string} id
   */
  id() {
    return this._data.id;
  }

  /**
   * Retrieves the mention text
   * @returns {string} text
   */
  text() {
    return this._data.text;
  }

  /**
   * Retrieves the mention sentence number
   * @see {@link CorefMention.sentence()} for simplicity
   * @returns {number} sentNum
   */
  sentNum() {
    return this._data.sentNum;
  }

  /**
   * Retrieves the mention headIndex
   * @returns {number} headIndex
   */
  headIndex() {
    return this._data.headIndex;
  }

  /**
   * Retrieves the mention startIndex
   * @returns {number} startIndex
   */
  startIndex() {
    return this._data.startIndex;
  }

  /**
   * Retrieves the mention endIndex
   * @returns {number} endIndex
   */
  endIndex() {
    return this._data.endIndex;
  }

  /**
   * Tells you if the mentions is representative or not
   * @returns {boolean} isRepresentativeMention
   */
  isRepresentativeMention() {
    return this._data.isRepresentativeMention;
  }

  /**
   * Retrieves the mention animacy
   * @returns {("ANIMATE"|"INANIMATE"|"UNKNOWN")} animacy
   */
  animacy() {
    return this._data.animacy;
  }

  /**
   * Retrieves the mention gender
   * @returns {("FEMALE"|"MALE"|"NEUTRAL"|"UNKNOWN")} gender
   */
  gender() {
    return this._data.gender;
  }

  /**
   * Retrieves the mention number
   * @returns {("SINGULAR"|"PLURAL"|"UNKNOWN")} number
   */
  number() {
    return this._data.number;
  }

  /**
   * Retrieves the mention type
   * @returns {("PRONOMINAL"|"NOMINAL"|"PROPER"|"LIST")} type
   */
  type() {
    return this._data.type;
  }

  /**
   * Retrieves the mention's sentence container
   * @returns {Sentence} sentence
   */
  sentence(sentence = null) {
    if (sentence) {
      this._sentence = sentence;
    }

    return this._sentence;
  }

  /**
   * Retrieves the mention's associated token
   * @returns {Token} token
   */
  token(token = null) {
    if (token) {
      this._token = token;
    }

    return this._token;
  }

  /**
   * Update an instance of CorefMention with data provided by a JSON
   * @param {CorefMentionJSON} data - The mention data, as returned by CoreNLP API service
   * @returns {CorefMention} mention - The current mention instance
   */
  fromJSON(data) {
    this._data = data;
    return this;
  }

  toJSON() {
    return { ...this._data };
  }

  /**
   * Get an instance of CorefMention from a given JSON
   * @param {CorefMentionJSON} data - The match data, as returned by CoreNLP API service
   * @returns {CorefMention} mention - A new CorefMention instance
   */
  static fromJSON(data) {
    const instance = new this();
    return instance.fromJSON(data);
  }
}

export default CorefMention;
