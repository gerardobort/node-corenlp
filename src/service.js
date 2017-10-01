import depInfo from './simple/annotator/depparse/dependencies.json';

/**
 * @class
 * @classdesc Middleware that interfaces between the pipeline and the connector strategies
 */
class Service {
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

  getTokensRegexData(text, pattern, annotators, options = {}) {
    return this._connector.get({
      annotators,
      text,
      options: {
        ...options,
        'tokensregex.pattern': pattern,
      },
      language: this._language.toLowerCase(),
      utility: 'tokensregex',
    });
  }

  getSemgrexData(text, pattern, annotators, options = {}) {
    return this._connector.get({
      annotators,
      text,
      options: {
        ...options,
        'semgrex.pattern': pattern,
      },
      language: this._language.toLowerCase(),
      utility: 'semgrex',
    });
  }

  getTregexData(text, pattern, annotators, options = {}) {
    return this._connector.get({
      annotators,
      text,
      options: {
        ...options,
        'tregex.pattern': pattern,
      },
      language: this._language.toLowerCase(),
      utility: 'tregex',
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

export default Service;
