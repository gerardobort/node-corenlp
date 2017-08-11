import rp from 'request-promise';

const config = {
  dsn: 'http://localhost:9000',
};

export default {

  /**
   * @returns {Promise.<Object>}
   */
  get: ({ annotators, text, language }) => rp({
    method: 'POST',
    uri: `${config.dsn}/?properties={"annotators":"${annotators.join()}","outputFormat":"json"}&pipelineLanguage=${language}`,
    body: text,
    json: true,
  }),

};
