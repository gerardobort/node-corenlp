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

    const rpOpts = {
      method: 'POST',
      uri: `${this.dsn}/?properties=${JSON.stringify(properties)}&pipelineLanguage=${language}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: text,
      json: true,
    };

    return rp(rpOpts);
  }
}
