import Annotable, { SSplit } from './annotable';
import Sentence from './sentence';
import _ from 'lodash';

export default class Document extends Annotable {
  /**
   * @param {string} text
   */
  constructor(text) {
    super(text);
    this._sentences = [];
    this._features = [];
  }

  toString() {
    return this._text || this._sentences.map(sent => sent.toString()).join('. ');
  }

  /**
   * @returns {Array.<Sentence>} sentences - The document sentences
   */
  sentences() {
    if (!this.hasAnnotator(SSplit)) {
      throw new Error('Asked for sentences on Document, but there are unmet annotator dependencies.');
    }
    return this._sentences;
  }

  /**
   * @param {number} index - The position of the sentence to get
   * @returns {Sentence} sentence - The document sentences
   */
  sentence(index) {
    return this.sentences()[index];
  }

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse
   * https://stanfordnlp.github.io/CoreNLP/dcoref.html
   * @returns {Promise.<DeterministicCorefAnnotator>} dcoref 
   */
  coref() {
  }

  /**
   * @param {Object} data - The document data, as returned by CoreNLP API service
   * @returns {Document} document - The current document instance
   */
  fromJson(data) {
    if (data.sentences) {
      this.addAnnotator(SSplit);
      this._sentences = data.sentences.map(sent => Sentence.fromJson(sent, true));
    }
    return this;
  }
}

/**
 * @typedef Document
 * @property {number} index
 * @property {Array.<Sentence>} sentences
 */
Document.fromJson = function (data) {
  const instance = new this();
  return instance.fromJson(data);
};
