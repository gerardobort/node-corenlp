import {
  Annotator,
} from './annotable';

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
  });
});

describe.skip('Annotable', () => {
  it('should...', () => {
  });
});
