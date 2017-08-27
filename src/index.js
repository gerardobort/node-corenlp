import Document from './simple/document';
import Sentence from './simple/sentence';
import Token from './simple/token';
import Annotable, { Annotator } from './simple/annotable';
import Service from './service';
import Connector from './connector';
import ConnectorCli from './connector-cli';
import Tree from './simple/util/tree';

/**
 * SimpleCoreNLP Interface
 * https://stanfordnlp.github.io/CoreNLP/simple.html
 */
export default {
  setup(connector = Service.connector, language = Service.language) {
    Service.connector = connector;
    Service.language = language;
  },
  Connector,
  ConnectorCli,
  Annotable,
  Annotator,
  Document,
  Sentence,
  Token,
  Tree,
};
