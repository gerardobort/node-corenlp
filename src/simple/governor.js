import Service from '../service';

/**
 * The CoreNLP API JSON structure representing a governor
 * @typedef GovernorJSON
 * @property {string} dep
 * @property {number} governor
 * @property {string} governorGloss
 * @property {number} dependent
 * @property {string} dependentGloss
 */

/**
 * Class representing a Governor
 */
export default class Governor {
  /**
   * Create a Governor
   * @param {string} dep
   * @param {Token} governorToken
   * @param {Token} dependentToken
   */
  constructor(dep, governorToken, dependentToken) {
    this._dep = dep;
    this._governorToken = governorToken;
    this._dependentToken = dependentToken;
  }

  /**
   * Get a string representation
   * @return {string} governor
   */
  toString() {
    return this._dep;
  }

  governor() {
    return this._governorToken;
  }

  governorGloss() {
    return this._governorToken.word();
  }

  dependent() {
    return this._dependentToken;
  }

  dependentGloss() {
    return this._dependentToken.word();
  }

  dep() {
    return Service.getGovernorDepInfo(this._dep);
  }
}
