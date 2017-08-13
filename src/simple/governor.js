import Service from './service';

export default class Governor {
  constructor(dep, governorToken, dependentToken) {
    this._dep = dep;
    this._governorToken = governorToken;
    this._dependentToken = dependentToken;
  }

  toString() {
    return this._dep;
  }

  governor() {
    return this._governorToken;
  }

  dependent() {
    return this._dependentToken;
  }

  governorGloss() {
    return this._governorToken.word();
  }

  dependentGloss() {
    return this._dependentToken.word();
  }

  dep() {
    return Service.getGovernorDepInfo(this._dep);
  }
}

/**
 * @typedef Governor
 * @property {string} dep
 * @property {number} governor
 * @property {string} governorGloss
 * @property {number} dependent
 * @property {string} dependentGloss
 */
