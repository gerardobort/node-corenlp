import rp from 'request-promise';

const config = {
  dsn: 'http://localhost:9000',
  language: 'es',
};

export default {

  /**
   * requirements: tokenize
   * https://stanfordnlp.github.io/CoreNLP/ssplit.html
   * @returns {Promise.<SentencesAnnotation>} ssplit
   */
  ssplit: (text) => rp({
    method: 'POST',
    uri: `${config.dsn}/?properties={"annotators":"tokenize,ssplit","outputFormat":"json"}&pipelineLanguage=${config.language}`,
    body: text,
    json: true,
  }),

  /**
   * requirements: tokenize, ssplit, pos, lemma
   * https://stanfordnlp.github.io/CoreNLP/lemma.html
   * @returns {Promise.<LemmaAnnotation>} lemma
   */
  lemma: (text) => rp({
    method: 'POST',
    uri: `${config.dsn}/?properties={"annotators":"tokenize,ssplit,pos,lemma","outputFormat":"json"}&pipelineLanguage=${config.language}`,
    body: text,
    json: true,
  }),
};
