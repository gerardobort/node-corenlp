import CoreNLP from '.';
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
import ConnectorServer from './connector/connector-server';
import ConnectorCli from './connector/connector-cli';
import Tree from './util/tree';

describe('CoreNLP Library entry point', () => {
  describe('CoreNLP', () => {
    describe('setup', () => {
      it('should have setup method', async () => {
        expect(CoreNLP).to.have.property('setup').that.is.a('function');
      });
    });

    describe('connector', () => {
      it('should have ConnectorServer', async () => {
        expect(CoreNLP.connector).to.have.property('ConnectorServer').that.equals(ConnectorServer);
      });

      it('should have ConnectorCli', async () => {
        expect(CoreNLP.connector).to.have.property('ConnectorCli').that.equals(ConnectorCli);
      });
    });

    describe('simple', () => {
      it('should have Annotable', async () => {
        expect(CoreNLP.simple).to.have.property('Annotable').that.equals(Annotable);
      });

      it('should have Annotator', async () => {
        expect(CoreNLP.simple).to.have.property('Annotator').that.equals(Annotator);
      });

      it('should have Document', async () => {
        expect(CoreNLP.simple).to.have.property('Document').that.equals(Document);
      });

      it('should have Sentence', async () => {
        expect(CoreNLP.simple).to.have.property('Sentence').that.equals(Sentence);
      });

      it('should have Token', async () => {
        expect(CoreNLP.simple).to.have.property('Token').that.equals(Token);
      });

      describe('annotator', () => {
        it('should have annotators', async () => {
          expect(CoreNLP.simple).to.have.property('annotator').that.deep.equals({
            TokenizerAnnotator,
            WordsToSentenceAnnotator,
            POSTaggerAnnotator,
            MorphaAnnotator,
            NERClassifierCombiner,
            ParserAnnotator,
            DependencyParseAnnotator,
            RelationExtractorAnnotator,
            RegexNERAnnotator,
          });
        });
      });
    });

    describe('util', () => {
      it('should have Tree', async () => {
        expect(CoreNLP.util).to.have.property('Tree').that.equals(Tree);
      });
    });
  });
});
