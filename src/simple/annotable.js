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
   * @param {Annotator|function} annotator
   */
  addAnnotator(annotator) {
    const annotatorInstance = annotator.getInstance();
    this._annotators[annotatorInstance.toString()] = annotatorInstance;
  }

  /**
   * Marks multiple annotators as a met dependencies
   * @param {Array.<Annotator|function>} annotators
   */
  addAnnotators(annotators) {
    annotators.forEach(annotator => this.addAnnotator(annotator.getInstance()));
  }

  /**
   * Unmarks an annotator as a met dependency
   * @param {Annotator|function} annotator
   */
  removeAnnotator(annotator) {
    delete this._annotators[annotator.getInstance().toString()];
  }

  /**
   * Tells you if an annotator is a met dependency
   * @param {Annotator|function} annotator
   * @returns {boolean} hasAnnotator
   */
  hasAnnotator(annotator) {
    return !!this._annotators[annotator.getInstance().toString()];
  }

  /**
   * Tells you if at least on of a list of annotators is a met dependency
   * @param {Array.<Annotator|function>} annotators
   * @returns {boolean} hasAnyAnnotator
   */
  hasAnyAnnotator(annotators) {
    return annotators.some(annotator =>
      // eslint-disable-next-line no-bitwise
      !!~Object.keys(this._annotators).indexOf(annotator.getInstance().toString()));
  }

  /**
   * Calls the service and loads the associated response metadata into the Annotable model
   * @async
   * @param {Annotator|function} annotator
   */
  async applyAnnotator(annotator) {
    const annotatorInstance = annotator.getInstance();
    this.fromJson(await Service.getAnnotationData(
      this._text, annotatorInstance.pipeline(), annotatorInstance.pipelineOptions()));
    this.addAnnotators(annotatorInstance.dependencies());
    this.addAnnotator(annotatorInstance);
  }
}
