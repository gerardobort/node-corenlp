import Service from './service';
import ConnectorServer from './connector/connector-server';
import tokenize from './simple/annotator/tokenize';
import ssplit from './simple/annotator/ssplit';
import pos from './simple/annotator/pos';
import lemma from './simple/annotator/lemma';
import ner from './simple/annotator/ner';
import parse from './simple/annotator/parse';
import depparse from './simple/annotator/depparse';
import relation from './simple/annotator/relation';
import regexner from './simple/annotator/regexner';

import {
  TokensRegexAnnotator,
  SemgrexAnnotator,
  TregexAnnotator,
} from './simple/expression';

const ANNOTATORS_BY_KEY = {
  tokenize,
  ssplit,
  pos,
  lemma,
  ner,
  parse,
  depparse,
  relation,
  regexner,
};

const LANGUAGE_TO_ISO2 = {
  English: 'en',
  French: 'fr',
  German: 'de',
  Spanish: 'es',
};

/**
 * Class representing a Pipeline.
 */
export default class Pipeline {
  /**
   * Create a Pipeline
   * @param {Properties} properties
   * @param {string} [language] - in CamelCase (i.e. English, Spanish)
   * @param {ConnectorServer|ConnectorCli} [connector]
   */
  constructor(properties, language = 'Unspecified', connector = null) {
    this._properties = properties;
    this._language = language;
    this._connector = connector || new ConnectorServer({});
    this._service = new Service(this._connector, this._language);
  }

  /**
   * Retrieves the current Service used by the pipeline
   * @param {Service} service
   */
  getService() {
    return this._service;
  }

  /**
   * Execute the pipeline against the annotable object, adding annotations to it.
   * Calls the service and loads the associated response metadata into the Annotable model
   * @async
   * @param {Annotable} annotable - the document or sentence to be annotated
   * @returns {Promise.<Annotable>} annotated document / sentence
   */
  async annotate(annotable) {
    annotable.fromJson(await this._service.getAnnotationData(
      annotable.text(),
      this._getAnnotatorsKeys(),
      this._getAnnotatrosOptions()));

    annotable.setLanguageISO(LANGUAGE_TO_ISO2[this._language]);
    annotable.addAnnotators(this._getAnnotators());

    return annotable;
  }

  async annotateTokensRegex(annotable) {
    annotable.fromJson(await this._service.getTokensRegexData(
      annotable.text(),
      annotable.pattern(),
      this._getAnnotatorsKeys(),
      this._getAnnotatrosOptions()));

    annotable.setLanguageISO(LANGUAGE_TO_ISO2[this._language]);
    annotable.addAnnotator(TokensRegexAnnotator);

    return annotable;
  }

  async annotateSemgrex(annotable) {
    annotable.fromJson(await this._service.getSemgrexData(
      annotable.text(),
      annotable.pattern(),
      this._getAnnotatorsKeys(),
      this._getAnnotatrosOptions()));

    annotable.setLanguageISO(LANGUAGE_TO_ISO2[this._language]);
    annotable.addAnnotator(SemgrexAnnotator);

    return annotable;
  }

  async annotateTregex(annotable) {
    annotable.fromJson(await this._service.getTregexData(
      annotable.text(),
      annotable.pattern(),
      this._getAnnotatorsKeys(),
      this._getAnnotatrosOptions()));

    annotable.setLanguageISO(LANGUAGE_TO_ISO2[this._language]);
    annotable.addAnnotator(TregexAnnotator);

    return annotable;
  }

  async _semgrex(text, pattern) {
    const data = await this._service.getSemgrexData(
      text,
      pattern,
      this._getAnnotatorsKeys(),
      this._getAnnotatrosOptions());

    return data;
  }

  /**
   * @private
   * @returns {Aray.<string>} annotators - those set for this pipeline
   */
  _getAnnotatorsKeys() {
    return this._properties.getProperty('annotators', '')
      .split(',').map(annotatorKey => annotatorKey.trim());
  }

  /**
   * @private
   * @returns {Aray.<Annotator>} annotators - those set for this pipeline
   */
  _getAnnotators() {
    return this._getAnnotatorsKeys()
      .map(annotatorKey => ANNOTATORS_BY_KEY[annotatorKey]);
  }

  /**
   * Only given options are those related to the annotators in the pipeline
   * @private
   * @returns {Aray.<Annotator>} annotators - those set for this pipeline
   */
  _getAnnotatrosOptions() {
    const pipelineProps = this._properties.getProperties();
    const validPrfixes = Object.keys(ANNOTATORS_BY_KEY);
    return Object.keys(pipelineProps)
      .filter(propName => validPrfixes.indexOf(propName) === 0)
      .reduce((acc, val, key) => ({ ...acc, [key]: val }), {});
  }
}

