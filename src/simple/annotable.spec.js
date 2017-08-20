import Annotable, {
  Annotator,
  Tokenize,
  SSplit,
  POS,
  Lemma,
  NER,
  Parse,
  DepParse,
  Relation,
} from './annotable';

describe('Annotator', function () {
  let annotator;

  beforeEach(function() {
    annotator = new Annotator('tokenize', {
      whitespace: true,
      keepeol: false,
      verbose: true,
    });
  });

  context('Pipeline setup', function() {

    describe('options / option', function() {
      it('should return the given options', function () {
        expect(annotator.options()).to.deep.equal({
          whitespace: true,
          keepeol: false,
          verbose: true,
        });
      });

      it('should return the given option', function () {
        expect(annotator.option('whitespace')).to.be.true;
        expect(annotator.option('keepeol')).to.be.false;
        expect(annotator.option('verbose')).to.be.true;
      });

      it('should set the given option', function () {
        expect(annotator.option('keepeol')).to.be.false;
        expect(annotator.option('keepeol', 'testset')).to.equal('testset');
        expect(annotator.option('keepeol')).to.equal('testset');
      });
    });

    describe('dependencies', function() {
      it('should return the given dependencies', function () {
        const dep1 = new Annotator('testdep', { testopt: true, testopt2: 'test' });
        const dep2 = new Annotator('testdep2', { testopt: true, testopt2: 'test' });
        annotator = new Annotator('tokenize', { whitespace: true, keepeol: false, verbose: true }, [dep1, dep2]);
        expect(annotator.dependencies()).to.deep.equal([ dep1, dep2 ]);
      });
    });

    describe('pipeline', function() {
      it('should return the given dependencies', function () {
        annotator = new Annotator('tokenize', { whitespace: true, keepeol: false, verbose: true }, [
          new Annotator('testdep', { testopt: true, testopt2: 'test' }),
          new Annotator('testdep2', { testopt: true, testopt2: 'test' }, [
            new Annotator('testdep3', { testopt: true, testopt2: 'test' }, [
              new Annotator('testdep4', { testopt: true, testopt2: 'test' })
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

    describe('pipelineOptions', function() {
      it('should return the options of the current annotator', function () {
        expect(annotator.pipelineOptions()).to.deep.equal({
          'tokenize.whitespace': true,
          'tokenize.keepeol': false,
          'tokenize.verbose': true,
        });
      });

      it('should return the options of the current annotator and its dependencies', function () {
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

      it('should return the options of the current annotator and its dependencies\' dependencies', function () {
        annotator = new Annotator('tokenize', { whitespace: true, keepeol: false, verbose: true }, [
          new Annotator('testdep', { testopt: true, testopt2: 'test' }),
          new Annotator('testdep2', { testopt: true, testopt2: 'test' }, [
            new Annotator('testdep3', { testopt: true, testopt2: 'test' }, [
              new Annotator('testdep4', { testopt: true, testopt2: 'test' })
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

  context('Other methods', function() {
    describe('toString', function() {
      it('should return the given name', function () {
        expect(annotator.toString()).to.equals('tokenize');
      });
    });
  });

});

describe.skip('Annotable', function () {
  it('should...', function () {
  });
});
