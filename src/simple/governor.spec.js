import Governor from './governor';
import Token from './token';

describe('Governor', () => {
  let governor;

  beforeEach(() => {
    governor = new Governor('det', new Token('pájaro'), new Token('él'));
  });

  context('SimpleCoreNLP.Governor interface', () => {
    it('should follow the SimpleCoreNLP.Governor contract', () => {
      // no contract
    });

    describe('constructor', () => {
      it('should receive a text', () => {
        expect(governor.toString()).to.equals('det');
      });
    });
  });

  context('Other methods', () => {
    describe('toString', () => {
      it('should return the given text', () => {
        expect(governor.toString()).to.equals('det');
      });
    });

    describe('governor / governorGloss', () => {
      it('should return the governor token that was initialized with', () => {
        expect(governor.governor()).to.be.instanceof(Token);
        expect(governor.governor().toString()).to.equals('pájaro');
      });

      it('should return the governorGloss token that was initialized with', () => {
        expect(governor.governorGloss()).to.be.a('string');
        expect(governor.governorGloss()).to.equals('pájaro');
      });
    });

    describe('dependent / dependentGloss', () => {
      it('should return the dependent token that was initialized with', () => {
        expect(governor.dependent()).to.be.instanceof(Token);
        expect(governor.dependent().toString()).to.equals('él');
      });

      it('should return the dependentGloss token that was initialized with', () => {
        expect(governor.dependentGloss()).to.be.a('string');
        expect(governor.dependentGloss()).to.equals('él');
      });
    });

    describe.skip('dep', () => {
      it('should...', () => {
      });
    });
  });
});
