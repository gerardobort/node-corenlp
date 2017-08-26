import Annotator, {
  TokenizerAnnotator,
  WordsToSentenceAnnotator,
  POSTaggerAnnotator,
  MorphaAnnotator,
  NERClassifierCombiner,
  ParserAnnotator,
  DependencyParseAnnotator,
  RelationExtractorAnnotator,
  DeterministicCorefAnnotator,
} from './annotator';

describe('Annotator', () => {
  let annotator;

  beforeEach(() => {
    annotator = new Annotator('tokenize', {
      whitespace: true,
      keepeol: false,
      verbose: true,
    });
  });

  context('Pipeline setup', () => {
    describe('options / option', () => {
      it('should return the given options', () => {
        expect(annotator.options()).to.deep.equal({
          whitespace: true,
          keepeol: false,
          verbose: true,
        });
      });

      it('should return the given option', () => {
        expect(annotator.option('whitespace')).to.be.true;
        expect(annotator.option('keepeol')).to.be.false;
        expect(annotator.option('verbose')).to.be.true;
      });

      it('should set the given option', () => {
        expect(annotator.option('keepeol')).to.be.false;
        expect(annotator.option('keepeol', 'testset')).to.equal('testset');
        expect(annotator.option('keepeol')).to.equal('testset');
      });
    });

    describe('dependencies', () => {
      it('should return the given dependencies', () => {
        const dep1 = new Annotator('testdep', { testopt: true, testopt2: 'test' });
        const dep2 = new Annotator('testdep2', { testopt: true, testopt2: 'test' });
        annotator = new Annotator('tokenize', { whitespace: true, keepeol: false, verbose: true }, [dep1, dep2]);
        expect(annotator.dependencies()).to.deep.equal([dep1, dep2]);
      });
    });

    describe('pipeline', () => {
      it('should return the given dependencies', () => {
        annotator = new Annotator('tokenize', { whitespace: true, keepeol: false, verbose: true }, [
          new Annotator('testdep', { testopt: true, testopt2: 'test' }),
          new Annotator('testdep2', { testopt: true, testopt2: 'test' }, [
            new Annotator('testdep3', { testopt: true, testopt2: 'test' }, [
              new Annotator('testdep4', { testopt: true, testopt2: 'test' }),
            ]),
          ]),
        ]);
        expect(annotator.pipeline()).to.deep.equals([
          'testdep',
          'testdep4',
          'testdep3',
          'testdep2',
          'tokenize',
        ]);
      });
    });

    describe('pipelineOptions', () => {
      it('should return the options of the current annotator', () => {
        expect(annotator.pipelineOptions()).to.deep.equal({
          'tokenize.whitespace': true,
          'tokenize.keepeol': false,
          'tokenize.verbose': true,
        });
      });

      it('should return the options of the current annotator and its dependencies', () => {
        annotator = new Annotator('tokenize', { whitespace: true, keepeol: false, verbose: true }, [
          new Annotator('testdep', { testopt: true, testopt2: 'test' }),
          new Annotator('testdep2', { testopt: true, testopt2: 'test' }),
        ]);

        expect(annotator.pipelineOptions()).to.deep.equal({
          'testdep.testopt': true,
          'testdep.testopt2': 'test',
          'testdep2.testopt': true,
          'testdep2.testopt2': 'test',
          'tokenize.whitespace': true,
          'tokenize.keepeol': false,
          'tokenize.verbose': true,
        });
      });

      it('should return the options of the current annotator and its dependencies\' dependencies', () => {
        annotator = new Annotator('tokenize', { whitespace: true, keepeol: false, verbose: true }, [
          new Annotator('testdep', { testopt: true, testopt2: 'test' }),
          new Annotator('testdep2', { testopt: true, testopt2: 'test' }, [
            new Annotator('testdep3', { testopt: true, testopt2: 'test' }, [
              new Annotator('testdep4', { testopt: true, testopt2: 'test' }),
            ]),
          ]),
        ]);

        expect(annotator.pipelineOptions()).to.deep.equal({
          'testdep.testopt': true,
          'testdep.testopt2': 'test',
          'testdep2.testopt': true,
          'testdep2.testopt2': 'test',
          'testdep3.testopt': true,
          'testdep3.testopt2': 'test',
          'testdep4.testopt': true,
          'testdep4.testopt2': 'test',
          'tokenize.whitespace': true,
          'tokenize.keepeol': false,
          'tokenize.verbose': true,
        });
      });
    });
  });

  context('Other methods', () => {
    describe('toString', () => {
      it('should return the given name', () => {
        expect(annotator.toString()).to.equals('tokenize');
      });
    });

    describe('equalsTo', () => {
      it('should accept annotators with same name', () => {
        const annotatorMock = {
          toString: sinon.stub().returns('tokenize'),
        };
        expect(annotator.equalsTo(annotatorMock)).to.be.true;
        expect(annotatorMock.toString).to.be.calledOnce;
      });

      it('should accept annotators with same name but different options', () => {
        const annotator1 = new Annotator('tokenize', { language: 'English' });
        const annotator2 = new Annotator('tokenize', { language: 'Unspecified' });
        expect(annotator1.equalsTo(annotator2)).to.be.true;
      });

      it('should reject annotators with different name', () => {
        const annotatorMock = {
          toString: sinon.stub().returns('ner'),
        };
        expect(annotator.equalsTo(annotatorMock)).to.be.false;
        expect(annotatorMock.toString).to.be.calledOnce;
      });
    });
  });

  context('CoreNLP Annotators', () => {
    describe('TokenizerAnnotator', () => {
      it('should have a proper pipeline', () => {
        expect(TokenizerAnnotator.pipeline()).to.deep.equal(['tokenize']);
      });

      it('should have the proper default options', () => {
        expect(TokenizerAnnotator.options()).to.deep.equal({
          language: 'Unspecified',
          // class: null,
          whitespace: false,
          keepeol: false,
          // options: null,
          verbose: false,
        });
      });
    });

    describe('WordsToSentenceAnnotator', () => {
      it('should have a proper pipeline', () => {
        expect(WordsToSentenceAnnotator.pipeline()).to.deep.equal(['tokenize', 'ssplit']);
      });

      it('should have the proper default options', () => {
        expect(WordsToSentenceAnnotator.options()).to.deep.equal({
          eolonly: false,
          isOneSentence: false,
          newlineIsSentenceBreak: 'never',
          boundaryMultiTokenRegex: null,
          boundaryTokenRegex: '\\.|[!?]+',
          boundariesToDiscard: null,
          htmlBoundariesToDiscard: null,
          tokenPatternsToDiscard: null,
          boundaryFollowersRegex: null,
        });
      });
    });

    describe('POSTaggerAnnotator', () => {
      it('should have a proper pipeline', () => {
        expect(POSTaggerAnnotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos']);
      });
    });

    describe('MorphaAnnotator', () => {
      it('should have a proper pipeline', () => {
        expect(MorphaAnnotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma']);
      });
    });

    describe('NERClassifierCombiner', () => {
      it('should have a proper pipeline', () => {
        expect(NERClassifierCombiner.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner']);
      });

      it('should have the proper default options', () => {
        expect(NERClassifierCombiner.options()).to.deep.equal({
          useSUTime: true,
          // model: null,
          applyNumericClassifiers: true,
        });
      });
    });

    describe('ParserAnnotator', () => {
      it('should have a proper pipeline', () => {
        expect(ParserAnnotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse']);
      });

      it('should have the proper default options', () => {
        expect(ParserAnnotator.options()).to.deep.equal({
        });
      });
    });

    describe('DependencyParseAnnotator', () => {
      it('should have a proper pipeline', () => {
        expect(DependencyParseAnnotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse', 'depparse']);
      });

      it('should have the proper default options', () => {
        expect(DependencyParseAnnotator.options()).to.deep.equal({
        });
      });
    });

    describe('RelationExtractorAnnotator', () => {
      it('should have a proper pipeline', () => {
        expect(RelationExtractorAnnotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse', 'depparse', 'relation']);
      });

      it('should have the proper default options', () => {
        expect(RelationExtractorAnnotator.options()).to.deep.equal({
        });
      });
    });

    describe('DeterministicCorefAnnotator', () => {
      it('should have a proper pipeline', () => {
        expect(DeterministicCorefAnnotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse', 'depparse', 'relation', 'dcoref']);
      });

      it('should have the proper default options', () => {
        expect(DeterministicCorefAnnotator.options()).to.deep.equal({
        });
      });
    });
  });
});
