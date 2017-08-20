import Governor from './governor';
import Token from './token';

describe('Governor', function () {
  let governor;

  beforeEach(function() {
    governor = new Governor('det', new Token('pájaro'), new Token('él'));
  });

  context('SimpleCoreNLP.Governor interface', function() {
    it('should follow the SimpleCoreNLP.Governor contract', function () {
      // no contract
    });

    describe('constructor', function() {
      it('should receive a text', function () {
        expect(governor.toString()).to.equals('det');
      });
    });
  });

  context('Other methods', function() {
    describe('toString', function() {
      it('should return the given text', function () {
        expect(governor.toString()).to.equals('det');
      });
    });

    describe('governor / governorGloss', function() {
      it('should return the governor token that was initialized with', function () {
        expect(governor.governor()).to.be.instanceof(Token);
        expect(governor.governor().toString()).to.equals('pájaro');
      });

      it('should return the governorGloss token that was initialized with', function () {
        expect(governor.governorGloss()).to.be.a('string');
        expect(governor.governorGloss()).to.equals('pájaro');
      });
    });

    describe('dependent / dependentGloss', function() {
      it('should return the dependent token that was initialized with', function () {
        expect(governor.dependent()).to.be.instanceof(Token);
        expect(governor.dependent().toString()).to.equals('él');
      });

      it('should return the dependentGloss token that was initialized with', function () {
        expect(governor.dependentGloss()).to.be.a('string');
        expect(governor.dependentGloss()).to.equals('él');
      });
    });

    describe.skip('dep', function() {
      it('should...', function () {
      });
    });

  });
});
