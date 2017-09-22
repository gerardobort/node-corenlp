import Properties from './properties';
import Pipeline from './pipeline';
import Document from './simple/document';
import Sentence from './simple/sentence';
import Token from './simple/token';
import Annotable from './simple/annotable';
import Annotator from './simple/annotator';
import TokenizerAnnotator from './simple/annotator/tokenize';
import WordsToSentenceAnnotator from './simple/annotator/ssplit';
import POSTaggerAnnotator from './simple/annotator/pos';
import MorphaAnnotator from './simple/annotator/lemma';
import NERClassifierCombiner from './simple/annotator/ner';
import ParserAnnotator from './simple/annotator/parse';
import DependencyParseAnnotator from './simple/annotator/depparse';
import RelationExtractorAnnotator from './simple/annotator/relation';
import RegexNERAnnotator from './simple/annotator/regexner';
import Service from './service';
import ConnectorServer from './connector/connector-server';
import ConnectorCli from './connector/connector-cli';
import Tree from './util/tree';

/**
 * CoreNLP NodeJS Interface
 */
export default {
  connector: {
    ConnectorServer,
    ConnectorCli,
  },

  Properties,
  Pipeline,
  Service,

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
    // Predefined annotators @see {@link https://stanfordnlp.github.io/CoreNLP/annotators.html}
    annotator: {
      TokenizerAnnotator,
      WordsToSentenceAnnotator,
      POSTaggerAnnotator,
      MorphaAnnotator,
      NERClassifierCombiner,
      ParserAnnotator,
      DependencyParseAnnotator,
      RelationExtractorAnnotator,
      RegexNERAnnotator,
    },
  },

  util: {
    Tree,
  },
};
