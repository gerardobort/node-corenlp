import rp from 'request-promise-native';

const config = {
  dsn: 'http://localhost:9000',
};

/**
 * @class
 * @classdesc Class representing a Connector Server (web server client)
 */
class ConnectorServer {
  /**
   * Create a ConnectorServer
   * @param {Object} config
   * @param {string} config.dsn - The StanfordCoreNLPServer dsn (example: 'http://localhost:9000')
   */
  constructor({ dsn = config.dsn } = { }) {
    this._dsn = dsn;
    this._rp = rp;
  }

  /**
   * @param {Object} config
   * @param {Array.<string>} config.annotators - The list of annotators that defines the pipeline
   * @param {string} config.text - The text to run the pipeline against
   * @param {Object} config.options - Additinal options (properties) for the pipeline
   * @param {string} config.language - Language full name in CamelCase (eg. Spanish)
   * @param {(''|'tokensregex'|'semgrex'|'tregex')} [utility] - Name of the utility to use
   * NOTE: most of the utilities receives properties, these should be passed via the options param
   * @returns {Promise<Object>}
   */
  get({ annotators, text, options, language, utility = '' }) {
    const properties = {
      annotators: annotators.join(),
      ...options,
      outputFormat: 'json',
    };

    let baseUrl = this._dsn;
    let queryString = `pipelineLanguage=${language}&properties=${JSON.stringify(properties)}`;

    /**
     * @description
     * The conenctor should support extensibility to special tools:
     * - For example, Semgrex is an utility that runs in a separate url Hanlder
     *   in StanfordCoreNLPServer
     *   This url is /semgrex, and apart of the normal options, it expects the
     *   query-string `pattern` as a must.  This `pattern` option is taken here from
     *   the options object, form the key `semgrex.pattern`.
     */
    if (utility) {
      // https://stanfordnlp.github.io/CoreNLP/corenlp-server.html#query-tokensregex-tokensregex
      baseUrl += `/${utility}`;
      queryString += `&${Object.keys(options)
        .filter(opt => opt.indexOf(`${utility}.`) === 0)
        .map(opt => `${opt.replace(`${utility}.`, '')}=${encodeURI(options[opt])}`)
        .join('&')}`;
    }

    return this._makeRequest(baseUrl, queryString, text);
  }

  // eslint-disable-next-line class-methods-use-this
  _makeRequest(baseUrl, queryString, text) {
    const rpOpts = {
      method: 'POST',
      uri: `${baseUrl}?${queryString}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: text,
      json: true,
    };

    return this._rp(rpOpts);
  }
}

export default ConnectorServer;
