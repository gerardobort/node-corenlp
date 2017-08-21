import Connector from '../connector';
import posInfoEs from '../annotations/pos/es.json';
// import parseInfoEs from '../annotations/parse/es.json';
import depInfo from '../annotations/depparse/dependencies.json';

export default {

  connector: new Connector({}),

  language: 'es',

  getAnnotationData(text, annotators, options = {}) {
    return this.connector.get({
      annotators,
      text,
      options,
      language: this.language,
    });
  },

  getTokenPosInfo: pos => posInfoEs.tagset[pos],

  getSentenceParseInfo: group => posInfoEs.multiword[group],

  getGovernorDepInfo: dep => depInfo.dependencies[dep],
};
