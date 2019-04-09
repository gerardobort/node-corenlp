import CorefMention from './coref-mention';

/**
 * @class
 * @classdesc Class representing an CorefChain
 */
class CorefChain {
  /**
   * Create an CorefChain
   * @param {Array.<CorefMention>} mentions
   */
  constructor(mentions) {
    this._mentions = mentions;
  }

  /**
   * Retrieves all the contained CorefMention instances
   * @returns {Array.<CorefMention>} mentions
   */
  mentions() {
    return this._mentions;
  }

  /**
   * Retrieves a CorefMention at the index specified
   * @param {number} index
   * @returns {CorefMention} mention
   */
  mention(index) {
    return this._mentions[index];
  }

  /**
   * Retrieves the first representative mention
   * @returns {CorefMention} mention
   */
  representative() {
    return this._mentions.find(mention => mention.isRepresentativeMention());
  }

  /**
   * Retrieves all the non-representative mentions
   * @returns {Array.<CorefMention>} mentions
   */
  nonRepresentatives() {
    return this._mentions.filter(mention => !mention.isRepresentativeMention());
  }

  /**
   * Gets or sets a Document reference for the current coref-chain
   * @param {Document} doc
   * @returns {Document} doc
   */
  document(doc = null) {
    if (doc) {
      this._document = doc;
    }

    return this._document;
  }

  /**
   * Update an instance of CorefChain with Document references to Sentence(s) and their Token(s)
   * @param {Document} doc - a Document object, the same one used to generate corefs annotations
   * @returns {CorefChain} chain - The current chain instance
   */
  fromDocument(doc) {
    this._mentions.forEach((mention) => {
      const sentence = doc.sentence(mention.sentNum() - 1);
      const token = sentence.token(mention.startIndex() - 1);
      mention.sentence(sentence);
      mention.token(token);
    });
    return this;
  }

  /**
   * Update an instance of CorefChain with data provided by a JSON
   * @param {Array.<CorefMentionJSON>} data - A sentence corefs mentions chain, as
   *  returned by CoreNLP API service
   * @returns {CorefChain} chain - The current chain instance
   */
  fromJSON(data) {
    this._mentions = data.map(mention => CorefMention.fromJSON(mention));
    return this;
  }

  toJSON() {
    return [...this._mentions];
  }

  /**
   * Get an instance of CorefChain from a given JSON of sentence corefs
   * @param {Array.<CorefMentionJSON>} data - The sentence corefs data, as
   *  returned by CoreNLP API service
   * @returns {CorefChain} sentenchain - A new CorefChain instance
   */
  static fromJSON(data) {
    const instance = new this();
    return instance.fromJSON(data);
  }
}

export default CorefChain;
