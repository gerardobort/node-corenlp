import Connector from './connector';
import depInfo from './simple/annotator/depparse/dependencies.json';

const LANGUAGE_TO_ISO2 = {
  English: 'en',
  French: 'fr',
  German: 'de',
  Spanish: 'es',
};

export default {

  /**
   * @param {Connector|ConnectorCli}
   */
  connector: new Connector({}),

  /**
   * @param {('English'|'French'|'German'|'Spanish'|'Unspecified'|'Whitesapce')}
   */
  language: 'Spanish',

  getAnnotationData(text, annotators, options = {}) {
    return this.connector.get({
      annotators,
      text,
      options,
      language: this.language.toLowerCase(),
    });
  },

  getTokenPosInfo(pos) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`./simple/annotator/pos/${LANGUAGE_TO_ISO2[this.language]}.json`)
        .tagset[pos];
    } catch (err) {
      throw new Error(`Unable to getTokenPosInfo for the language ${this.language}`);
    }
  },

  getSentenceParseInfo(group) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`./simple/annotator/parse/${LANGUAGE_TO_ISO2[this.language]}.json`)
        .multiword[group];
    } catch (err) {
      throw new Error(`Unable to getSentenceParseInfo for the language ${this.language}`);
    }
  },

  getGovernorDepInfo: dep => depInfo.dependencies[dep],
};
