/**
 * @class
 * @classdesc Class representing an Annotable
 * @memberof CoreNLP/simple
 */
class Annotable {
  /**
   * Create an Annotable
   * @param {string} text
   */
  constructor(text) {
    this._text = text;
    this._annotators = {};
  }

  /**
   * Get a string representation of the raw text
   * @return {string} text
   */
  text() {
    return this._text;
  }

  /**
   * Sets the language ISO (given by the pipeline during the annotation process)
   * This is solely to keep track of the language chosen for further analysis
   * @return {string} text
   */
  setLanguageISO(iso) {
    this._language = iso;
  }

  /**
   * Retrieves the language ISO
   * @return {string} text
   */
  getLanguageISO() {
    return this._language;
  }

  /**
   * Marks an annotator as a met dependency
   * @param {Annotator|function} annotator
   */
  addAnnotator(annotator) {
    this._annotators[annotator.toString()] = annotator;
  }

  /**
   * Marks multiple annotators as a met dependencies
   * @param {Array.<Annotator|function>} annotators
   */
  addAnnotators(annotators) {
    annotators.forEach(annotator => this.addAnnotator(annotator));
  }

  /**
   * Unmarks an annotator as a met dependency
   * @param {Annotator|function} annotator
   */
  removeAnnotator(annotator) {
    delete this._annotators[annotator.toString()];
  }

  /**
   * Tells you if an annotator is a met dependency
   * @param {Annotator|function} annotator
   * @returns {boolean} hasAnnotator
   */
  hasAnnotator(annotator) {
    return !!this._annotators[annotator.toString()];
  }

  /**
   * Tells you if at least on of a list of annotators is a met dependency
   * @param {Array.<Annotator|function>} annotators
   * @returns {boolean} hasAnyAnnotator
   */
  hasAnyAnnotator(annotators) {
    return annotators.some(annotator =>
      // eslint-disable-next-line no-bitwise
      !!~Object.keys(this._annotators).indexOf(annotator.toString()));
  }
}

export default Annotable;
