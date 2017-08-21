import Document from './simple/document';
import Sentence from './simple/sentence';
import Token from './simple/token';
import Annotable from './simple/annotable';
import Service from './simple/service';
import Connector from './connector';
import ConnectorCli from './connector-cli';

/**
 * SimpleCoreNLP Interface
 * https://stanfordnlp.github.io/CoreNLP/simple.html
 */
export default {
  setup(connector, language) {
    Service.connector = connector || Service.connector;
    Service.language = language || Service.language;
  },
  Connector,
  ConnectorCli,
  Document,
  Sentence,
  Token,
};
