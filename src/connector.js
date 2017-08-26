import rp from 'request-promise';

const config = {
  dsn: 'http://localhost:9000',
};

export default class Connector {
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
      body: text,
      json: true,
    };

    return rp(rpOpts);
  }
}
