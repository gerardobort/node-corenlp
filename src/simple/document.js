import Connector from './connector';
import SentencesAnnotation from './sentences-annotation';

export default class Document {
  constructor(text) {
    this._text = text;
  }

  /**
   * requirements: tokenize
   * https://stanfordnlp.github.io/CoreNLP/ssplit.html
   * @returns {Promise.<SentencesAnnotation>} ssplit
   */
  async _ssplit() {
    this._sentencesAnnotation = SentencesAnnotation.fromJson(
      await Connector.ssplit(this._text)
    );
  }

  async sentences() {
    if (!this._sentencesAnnotation) {
      await this._ssplit();
    }
    return this._sentencesAnnotation;
  }

  async sentence(index) {
    if (!this._sentencesAnnotation) {
      await this._ssplit();
    }
    return this._sentencesAnnotation.sentence(index);
  }

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse
   * https://stanfordnlp.github.io/CoreNLP/dcoref.html
   * @returns {Promise.<DeterministicCorefAnnotator>} dcoref 
   */
  coref() {
  }
}
