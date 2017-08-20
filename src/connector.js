import rp from 'request-promise';

const config = {
  dsn: 'http://localhost:9000',
};

export default {

  /**
   * @returns {Promise.<Object>}
   */
  get: ({ annotators, text, options, language }) => {
    const properties = {
      annotators: annotators.join(),
      ...options,
      outputFormat: 'json',
    };
    // console.log('Annptators', `${config.dsn}/?properties=${JSON.stringify(properties)}&pipelineLanguage=${language}`);
    return rp({
      method: 'POST',
      uri: `${config.dsn}/?properties=${JSON.stringify(properties)}&pipelineLanguage=${language}`,
      body: text,
      json: true,
    })
  },

};
