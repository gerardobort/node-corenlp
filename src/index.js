import Document from './simple/document';
import Sentence from './simple/sentence';
import Token from './simple/token';
import Annotable from './simple/annotable';
import Annotator, { annotator } from './simple/annotator';
import Service from './service';
import ConnectorServer from './connector/connector-server';
import ConnectorCli from './connector/connector-cli';
import Tree from './util/tree';

/**
 * CoreNLP NodeJS Interface
 */
export default {
  setup(language = null, connector = null) {
    Service.language = language || Service.language;
    Service.connector = connector || Service.connector;
  },

  connector: {
    ConnectorServer,
    ConnectorCli,
  },

  /**
   * https://stanfordnlp.github.io/CoreNLP/simple.html
   */
  simple: {
    Annotable,
    Annotator,
    Document,
    Sentence,
    Token,
    // namespace for default annotators
    annotator,
  },

  util: {
    Tree,
  },
};
