import rp from 'request-promise';
import Connector from '../connector';
import posInfoEs from '../annotations/pos/es.json';
import parseInfoEs from '../annotations/parse/es.json';
import depInfo from '../annotations/depparse/dependencies.json';
import _ from 'lodash';

const config = {
  language: 'es',
};

const debug = data => {
  console.log(JSON.stringify(data, null, 4));
  return data;
};

export default {

  getAnnotationData: (text, annotators) => Connector.get({
      text,
      annotators,
      language: config.language,
    }),

  getTokenPosInfo: (pos) => posInfoEs.tagset[pos],

  getSentenceParseInfo: (group) => posInfoEs.multiword[group],

  getGovernorDepInfo: (dep) => depInfo.dependencies[dep],
};
