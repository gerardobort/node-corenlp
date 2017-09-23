import _ from 'lodash';

/**
 * Class representing an Annotatror.
 * @extends Annotator
 */
export default class Annotator {
  /**
   * Create an Annotator
   * @param {string} name
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   * @param {Array.<Annotator>} [dependencies]
   */
  constructor(name, options = {}, dependencies = []) {
    this._name = name;
    this._options = options;
    this._dependencies = dependencies;
  }

  /**
   * Get a string representation
   * @return {string} annotator
   */
  toString() {
    return this._name;
  }

  /**
   * Defines whether a given annotator is the same as current, using shallow compare.
   * This is useful for a Document or Sentence to validate if the minimum of annotators required
   * were already applied to them.  Allows at the same time the users to instantiate new annotators
   * and configure them as needed.
   * @param {Annotator} annotator
   * @return {boolean}
   */
  equalsTo(annotator) {
    return this._name === annotator.toString();
  }

  /**
   * Get an Object key-value representation of the annotor's options (excluding prefix)
   * @return {Object} options
   */
  options() {
    return this._options;
  }

  /**
   * Get/Set an option value
   * @param {string} key
   * @param {string|boolean} [value]
   * @return {string} value
   */
  option(key, value = null) {
    if (value === null) {
      return this._options[key];
    }
    this._options[key] = value;
    return value;
  }

  /**
   * Get a list of annotators dependencies
   * @return {Array.<Annotator>} dependencies
   */
  dependencies() {
    return this._dependencies;
  }

  /**
   * Get a list of annotators dependencies, following by this annotator, all this as
   * a list of strings
   * This is useful to fulfill the `annotators` param in CoreNLP API properties.
   * @return {Array.<string>} pipeline
   */
  pipeline() {
    return _.uniq(
      _.flatten(
        this.dependencies()
          .map(annotator => annotator.pipeline()),
      )
        .concat([this.toString()]),
    );
  }

  /**
   * Get an object of all the Annotator options including the current and all its 
   * dependencies, prefixed by the annotator names
   * This is useful to fulfill the options params in CoreNLP API properties.
   * @return {Array.<string>} pipelineOptions
   */
  pipelineOptions() {
    return _.reduce(
      this.dependencies().map(annotator => annotator.pipelineOptions())
        .concat(Object.keys(this.options()).map(opt => ({ [`${this}.${opt}`]: this.option(opt) }))),
      (ac, option) => ({ ...ac, ...option }),
      {},
    );
  }
}
