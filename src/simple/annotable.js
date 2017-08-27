import Service from '../service';

/**
 * Class representing an Annotable.
 */
export default class Annotable {
  /**
   * Create an Annotable
   * @param {string} text
   */
  constructor(text) {
    this._text = text;
    this._annotators = {};
  }

  /**
   * Marks an annotator as a met dependency
   * @param {Annotator} annotator
   */
  addAnnotator(annotator) {
    this._annotators[annotator.toString()] = annotator;
  }

  /**
   * Marks multiple annotators as a met dependencies
   * @param {Array.<Annotator>} annotators
   */
  addAnnotators(annotators) {
    annotators.forEach(annotator => this.addAnnotator(annotator));
  }

  /**
   * Unmarks an annotator as a met dependency
   * @param {Annotator} annotator
   */
  removeAnnotator(annotator) {
    delete this._annotators[annotator.toString()];
  }

  /**
   * Tells you if an annotator is a met dependency
   * @param {Annotator} annotator
   * @returns {boolean} hasAnnotator
   */
  hasAnnotator(annotator) {
    return !!this._annotators[annotator.toString()];
  }

  /**
   * Tells you if at least on of a list of annotators is a met dependency
   * @param {Array.<Annotator>} annotators
   * @returns {boolean} hasAnyAnnotator
   */
  hasAnyAnnotator(annotators) {
    return annotators.some(annotator =>
      // eslint-disable-next-line no-bitwise
      !!~Object.keys(this._annotators).indexOf(annotator.toString()));
  }

  /**
   * Calls the service and loads the associated response metadata into the Annotable model
   * @async
   * @param {Annotator} annotator
   */
  async applyAnnotator(annotator) {
    this.fromJson(await Service.getAnnotationData(
      this._text, annotator.pipeline(), annotator.pipelineOptions()));
    this.addAnnotators(annotator.dependencies());
    this.addAnnotator(annotator);
  }
}
