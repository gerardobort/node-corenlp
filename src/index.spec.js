import CoreNLP, {
  Properties,
  Pipeline,
  ConnectorServer,
  ConnectorCli,
} from '.';
import Document from './simple/document';
import Sentence from './simple/sentence';
import Token from './simple/token';
import Annotable from './simple/annotable';
import Annotator from './simple/annotator';
import TokenizerAnnotator from './simple/annotator/tokenize';
import OpenIEAnnotator from './simple/annotator/openie';
import NaturalLogicAnnotator from './simple/annotator/natlog';
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

describe('CoreNLP Library entry point', () => {
  describe('CoreNLP', () => {
    describe('constructor', () => {
      it('should have a constructor method', async () => {
        expect(CoreNLP).to.have.property('constructor').that.is.a('function');
      });
    });

    describe('connector', () => {
      it('should have ConnectorServer', async () => {
        expect(ConnectorServer).to.be.a('function');
      });

      it('should have ConnectorCli', async () => {
        expect(ConnectorCli).to.be.a('function');
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
            CorefAnnotator,
            NaturalLogicAnnotator,
            OpenIEAnnotator,
          });
        });
      });
    });

    describe('util', () => {
      it('should have Tree', async () => {
        expect(CoreNLP.util).to.have.property('Tree').that.equals(Tree);
      });
    });

    describe('Integration Test', () => {
      context('Using ConnectorServer', async () => {
        it('should allow to initialize a pipeline and run annotations', async () => {
          const connector = new ConnectorServer({ dsn: 'http://localhost:9000' });
          sinon.stub(connector, 'get').returns(Promise.resolve({
            sentences: [{
              tokens: [
                {
                  word: 'Hello',
                  pos: 'UH',
                  ner: 'O',
                },
                {
                  word: 'world',
                  pos: 'NN',
                  ner: 'O',
                },
              ],
            }],
          }));
          const props = new Properties({
            annotators: 'tokenize,ssplit',
          });
          const pipeline = new Pipeline(props, 'English', connector);
          const sent = new CoreNLP.simple.Sentence('Hello world');
          await pipeline.annotate(sent);
          expect(sent.word(0)).to.equal('Hello');
          expect(sent.word(1)).to.equal('world');
          expect(sent.token(0).pos()).to.equal('UH');
          expect(sent.token(1).pos()).to.equal('NN');
          expect(sent.token(0).ner()).to.equal('O');
          expect(sent.token(1).ner()).to.equal('O');
        });
      });

      context('Using ConnectorCli', async () => {
        it('should allow to initialize a pipeline and run annotations', async () => {
          const connector = new ConnectorCli({
            classPath: 'corenlp/stanford-corenlp-full-2017-06-09/*',
            mainClass: 'edu.stanford.nlp.pipeline.StanfordCoreNLP',
            props: 'StanfordCoreNLP-spanish.properties',
          });
          sinon.stub(connector, 'get').returns(Promise.resolve({
            sentences: [{
              tokens: [
                {
                  word: 'Hello',
                  pos: 'UH',
                  ner: 'O',
                },
                {
                  word: 'world',
                  pos: 'NN',
                  ner: 'O',
                },
              ],
            }],
          }));
          const props = new Properties({
            annotators: 'tokenize,ssplit',
          });
          const pipeline = new Pipeline(props, 'English', connector);
          const sent = new CoreNLP.simple.Sentence('Hello world');
          await pipeline.annotate(sent);
          expect(sent.word(0)).to.equal('Hello');
          expect(sent.word(1)).to.equal('world');
          expect(sent.token(0).pos()).to.equal('UH');
          expect(sent.token(1).pos()).to.equal('NN');
          expect(sent.token(0).ner()).to.equal('O');
          expect(sent.token(1).ner()).to.equal('O');
        });
      });
    });
  });
});
