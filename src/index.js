import Document from './simple/document';
import Sentence from './simple/sentence';
import Token from './simple/token';
import Expression from './simple/expression';
import Annotable from './simple/annotable';
import Annotator from './simple/annotator';
import TokenizerAnnotator from './simple/annotator/tokenize';
import NaturalLogicAnnotator from './simple/annotator/natlog';
import OpenIEAnnotator from './simple/annotator/openie';
import WordsToSentenceAnnotator from './simple/annotator/ssplit';
import POSTaggerAnnotator from './simple/annotator/pos';
import MorphaAnnotator from './simple/annotator/lemma';
import NERClassifierCombiner from './simple/annotator/ner';
import ParserAnnotator from './simple/annotator/parse';
import DependencyParseAnnotator from './simple/annotator/depparse';
import RelationExtractorAnnotator from './simple/annotator/relation';
import RegexNERAnnotator from './simple/annotator/regexner';
import CorefAnnotator from './simple/annotator/coref';
import Tree from './util/tree';
import _Properties from './properties';
import _Pipeline from './pipeline';
import _Service from './service';
import _ConnectorCli from './connector/connector-cli';
import _ConnectorServer from './connector/connector-server';

export const Properties = _Properties;
export const Pipeline = _Pipeline;
export const Service = _Service;
export const ConnectorCli = _ConnectorCli;
export const ConnectorServer = _ConnectorServer;

/**
 * CoreNLP NodeJS Interface
 * @namespace CoreNLP
 */
export default {
  /**
   * @namespace CoreNLP/simple
   * @description NodeJS API that emulates {@link https://stanfordnlp.github.io/CoreNLP/simple.html}
   */
  simple: {
    Annotable,
    Annotator,
    Document,
    Sentence,
    Token,
    Expression,
    /**
     * @namespace CoreNLP/simple/annotator
     * @description Predefined annotators {@link https://stanfordnlp.github.io/CoreNLP/annotators.html}
     */
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
      CorefAnnotator,
      NaturalLogicAnnotator,
      OpenIEAnnotator,
    },
  },
  /**
   * @namespace CoreNLP/util
   * @description Utilities
   */
  util: {
    Tree,
  },
};
