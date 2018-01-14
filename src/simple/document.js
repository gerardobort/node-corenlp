import Annotable from './annotable';
import WordsToSentenceAnnotator from './annotator/ssplit';
import Sentence from './sentence';
import CorefChain from './coref-chain';
import CorefAnnotator from './annotator/coref';

/**
 * The CoreNLP API JSON structure representing a document
 * @typedef DocumentJSON
 * @property {number} index
 * @property {Array.<Sentence>} sentences
 */

/**
 * @class
 * @classdesc Class representing a Document
 * @extends Annotable
 * @memberof CoreNLP/simple
 */
class Document extends Annotable {
  /**
   * Create a Document
   * @param {string} text
   */
  constructor(text) {
    super(text);
    this._sentences = [];
  }

  /**
   * Get a string representation
   * @return {string} document
   */
  toString() {
    return this._text || this._sentences.map(sent => sent.toString()).join('. ');
  }

  /**
   * Get a list of sentences
   * @returns {Array.<Sentence>} sentences - The document sentences
   */
  sentences() {
    if (!this.hasAnnotator(WordsToSentenceAnnotator)) {
      throw new Error('Asked for sentences on Document, but there are unmet annotator dependencies.');
    }
    return this._sentences;
  }

  /**
   * Get the sentence for a given index
   * @param {number} index - The position of the sentence to get
   * @returns {Sentence} sentence - The document sentences
   */
  sentence(index) {
    return this.sentences()[index];
  }

  /**
   * @todo Missing implementation
   * @see https://stanfordnlp.github.io/CoreNLP/dcoref.html
   * @returns {Array.<CorefChain>}
   */
  corefs() {
    if (!this.hasAnnotator(CorefAnnotator)) {
      throw new Error('Asked for corefs on Document, but there are unmet annotator dependencies.');
    }
    return this._corefs;
  }

  /**
   * Get the coreference for a given index
   * @param {number} index - 0-based index of the coref chain list
   * @see https://stanfordnlp.github.io/CoreNLP/dcoref.html
   * @returns {CorefChain}
   */
  coref(index) {
    return this.corefs()[index];
  }

  /**
   * Sets the language ISO (given by the pipeline during the annotation process)
   * This is solely to keep track of the language chosen for further analysis
   * @return {string} text
   */
  setLanguageISO(iso) {
    super.setLanguageISO(iso);
    this._sentences.forEach(sentence => sentence.setLanguageISO(iso));
  }

  /**
   * Update an instance of Document with data provided by a JSON
   * @param {DocumentJSON} data - The document data, as returned by CoreNLP API service
   * @returns {Document} document - The current document instance
   */
  fromJSON(data) {
    if (data.sentences) {
      this.addAnnotator(WordsToSentenceAnnotator);
      this._sentences = data.sentences.map(sent => Sentence.fromJSON(sent, true));
    }
    if (data.corefs) {
      this.addAnnotator(CorefAnnotator);
      this._corefs = Object.keys(data.corefs)
        .filter(chainIndex => chainIndex !== 'length')
        .map(chainIndex => CorefChain.fromJSON(data.corefs[chainIndex]).fromDocument(this));
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
   * Get an instance of Document from a given JSON
   * @param {DocumentJSON} data - The document data, as returned by CoreNLP API service
   * @returns {Document} document - A new Document instance
   */
  static fromJSON(data) {
    const instance = new this();
    return instance.fromJSON(data);
  }
}

export default Document;
