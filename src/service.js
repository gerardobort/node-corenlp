import depInfo from './simple/annotator/depparse/dependencies.json';

export default class Service {
  /**
   * Create a Service
   * @param {ConnectorServer|ConnectorCli} connector
   * @param {('English'|'French'|'German'|'Spanish'|'Unspecified'|'Whitesapce')} [language]
   */
  constructor(connector, language = 'Unspecified') {
    this._connector = connector;
    this._language = language;
  }

  getAnnotationData(text, annotators, options = {}) {
    return this._connector.get({
      annotators,
      text,
      options,
      language: this._language.toLowerCase(),
    });
  }

  static getTokenPosInfo(pos, languageISO) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`./simple/annotator/pos/${languageISO}.json`)
        .tagset[pos];
    } catch (err) {
      return undefined;
    }
  }

  static getSentenceParseInfo(group, languageISO) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`./simple/annotator/parse/${languageISO}.json`)
        .multiword[group];
    } catch (err) {
      return undefined;
    }
  }

  static getGovernorDepInfo(dep) {
    return depInfo.dependencies[dep];
  }
}
