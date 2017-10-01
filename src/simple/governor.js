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
 * @class
 * @classdesc Class representing a Governor
 * @memberof CoreNLP/simple
 */
class Governor {
  /**
   * Create a Governor
   * @param {string} dep
   * @param {Token} dependentToken
   * @param {Token} [governorToken]
   */
  // constructor(dep, dependentToken, governorToken = Token.fromJSON({ index: 0, word: 'ROOT' })) {
  constructor(dep, dependentToken, governorToken = null) {
    this._dep = dep;
    this._dependentToken = dependentToken;
    this._governorToken = governorToken;
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
    return this._governorToken ? this._governorToken.word() : '';
  }

  dependent() {
    return this._dependentToken;
  }

  dependentGloss() {
    return this._dependentToken.word() ? this._dependentToken.word() : '';
  }

  dep() {
    return this._dep;
  }

  depInfo() {
    return Service.getGovernorDepInfo(this._dep);
  }

  toJSON() {
    return {
      dep: this._dep,
      governor: this._governorToken ? this._governorToken.index() : 0,
      governorGloss: this._governorToken ? this._governorToken.word() : 'ROOT',
      dependent: this._dependentToken.index(),
      dependentGloss: this._dependentToken.word(),
    };
  }

  /**
   * Get an instance of Governor from a given JSON
   * 
   * @todo It is not possible to properly generate a Governor from a GovernorJSON
   *       the Governor requires references to the Token instances in order to work
   * @param {GovernorJSON} data - The token data, as returned by CoreNLP API service
   * @returns {Governor} governor - A new Governor instance
   */
  static fromJSON() {
    throw Error('Not implemented');
  }
}

export default Governor;
