import rp from 'request-promise-native';

const config = {
  dsn: 'http://localhost:9000',
};

export default class ConnectorServer {
  constructor({ dsn = config.dsn }) {
    this.dsn = dsn;
  }

  /**
   * @returns {Promise.<Object>}
   */
  get({ annotators, text, options, language }) {
    const properties = {
      annotators: annotators.join(),
      ...options,
      outputFormat: 'json',
    };

    let baseUrl = this.dsn;
    let queryString = `pipelineLanguage=${language}&properties=${JSON.stringify(properties)}`;

    /**
     * @todo
     * Refactor this different case as a strategy not dependant on the connector necessarily.
     * The conenctor should support extensibility to special cases like `tokensregex`.
     */
    if (annotators.indexOf('regexner') > -1) {
      // https://stanfordnlp.github.io/CoreNLP/corenlp-server.html#query-tokensregex-tokensregex
      baseUrl += '/tokensregex';
      queryString += `&pattern=${encodeURI(properties['regexner.validpospattern'])}`;
      delete properties['regexner.validpospattern'];
    }

    const rpOpts = {
      method: 'POST',
      uri: `${baseUrl}?${queryString}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: text,
      json: true,
    };

    return rp(rpOpts);
  }
}
