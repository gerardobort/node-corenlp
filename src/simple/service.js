import rp from 'request-promise';
import Connector from '../connector';
import posInfoEs from './annotations/pos/es.json'
import _ from 'lodash';

const config = {
  language: 'es',
};

const debug = data => {
  console.log(JSON.stringify(data, null, 4));
  return data;
};

const ANNOTATORS_BY_ANNOTATOR = {
  ssplit: ['tokenize', 'ssplit'],
  lemma: ['tokenize', 'ssplit', 'pos', 'lemma'],
  ner: ['tokenize', 'ssplit', 'pos', 'lemma', 'ner'],
  parse: ['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse'],
  depparse: ['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse', 'depparse'],
  relation: ['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse', 'depparse', 'relation'],
};

export default {

  getAnnotatorsAppliedByAnnotator: (annotator) => ANNOTATORS_BY_ANNOTATOR[annotator],

  /**
   * requirements: tokenize
   * https://stanfordnlp.github.io/CoreNLP/ssplit.html
   * Adds sentences {string}
   * @returns {Promise.<SentencesAnnotation>} ssplit
   */
  ssplit: (text) => Connector.get({
      text,
      annotators: ANNOTATORS_BY_ANNOTATOR.ssplit,
      language: config.language,
    }),

  /**
   * requirements: tokenize, ssplit, pos, lemma
   * https://stanfordnlp.github.io/CoreNLP/lemma.html
   * Adds sentences.0.tokens.0.lemma {string}
   * @returns {Promise.<LemmaAnnotation>} lemma
   */
  lemma: (text) => Connector.get({
      text,
      annotators: ANNOTATORS_BY_ANNOTATOR.lemma,
      language: config.language,
    }),

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner
   * https://stanfordnlp.github.io/CoreNLP/ner.html
   * Adds sentences.0.tokens.0.ner {string}
   * @returns {Promise.<NERAnnotation>} ner
   */
  ner: (text) => Connector.get({
      text,
      annotators: ANNOTATORS_BY_ANNOTATOR.ner,
      language: config.language,
    }).then(debug),

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse
   * https://stanfordnlp.github.io/CoreNLP/parse.html
   * Adds sentences.parse {string} A tree-like structure describing the sentence as a single string
   * @returns {Promise.<ParseAnnotation>} parse
   */
  parse: (text) => Connector.get({
      text,
      annotators: ANNOTATORS_BY_ANNOTATOR.parse,
      language: config.language,
    }).then(debug),

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse, depparse
   * https://stanfordnlp.github.io/CoreNLP/depparse.html
   * @returns {Promise.<DepParseAnnotation>} parse
   */
  depparse: (text) => Connector.get({
      text,
      annotators: ANNOTATORS_BY_ANNOTATOR.depparse,
      language: config.language,
    }).then(debug),

  /**
   * requirements: tokenize, ssplit, pos, lemma, ner, parse, depparse, relation
   * https://stanfordnlp.github.io/CoreNLP/relation.html
   * Adds basicDependencies, enhancedDependencies, enhancedPlusPlusDependencies
   * @returns {Promise.<RelationAnnotation>} relation
   */
  relation: (text) => Connector.get({
      text,
      annotators: ANNOTATORS_BY_ANNOTATOR.relation,
      language: config.language,
    }).then(debug),

  getTokenPosInfo: (token) => posInfoEs.tagset[token._pos],
};
