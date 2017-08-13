import Annotable from './annotable';
import Sentence from './sentence';
import _ from 'lodash';

export default class Document extends Annotable {
  constructor(text) {
    super(text);
    this._sentences = [];
    this._features = [];
  }

  sentences() {
    return this._sentences;
  }

  sentence(index) {
    return this._sentences[index];
  }

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse
   * https://stanfordnlp.github.io/CoreNLP/dcoref.html
   * @returns {Promise.<DeterministicCorefAnnotator>} dcoref 
   */
  coref() {
  }

  fromJson(data) {
    this._sentences = data.sentences.map(sent => Sentence.fromJson(sent, true));
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
