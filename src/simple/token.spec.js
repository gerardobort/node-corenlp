import Token from './token';

describe('Token', function () {
  let token;

  beforeEach(function() {
    token = new Token('loren');
  });

  context('SimpleCoreNLP.Token interface', function() {
    it('should follow the SimpleCoreNLP.Token contract', function () {
      // no contract
    });

    describe('constructor', function() {
      it('should receive a text', function () {
        expect(token.toString()).to.equals('loren');
      });
    });
  });

  context('Other methods', function() {
    describe('toString', function() {
      it('should return the given text', function () {
        expect(token.toString()).to.equals('loren');
      });

      it('should return the computed text when it is initialized by the JSON API', function () {
        const token = Token.fromJson({
          word: 'loren',
        }, true);
        expect(token.toString()).to.equals('loren');
      });
    });

    describe('index', function() {
      it('should return the index that was given by the JSON API', async function () {
        const token = Token.fromJson({
          index: 3,
          word: 'loren',
        }, true);
        expect(token.index()).to.be.a('number');
        expect(token.index()).to.equals(3);
      });
    });

    describe('word', function() {
      it('should return the word that was initialized with', function () {
        expect(token.word()).to.be.a('string');
        expect(token.word()).to.equals('loren');
      });

      it('should return the word given by the JSON API', async function () {
        const token = Token.fromJson({
          word: 'loren',
        }, true);
        expect(token.word()).to.be.a('string');
        expect(token.word()).to.equals('loren');
      });
    });

    describe('lemma', function() {
      it('should return the lemma given by the JSON API', function () {
        const token = Token.fromJson({
          word: 'loren',
          lemma: 'lor',
        }, true);
        expect(token.lemma()).to.be.a('string');
        expect(token.lemma()).to.equals('lor');
      });
    });

    describe.skip('pos', function() {
      it('should return the pos given by the JSON API', function () {
        const token = Token.fromJson({
          word: 'loren',
          pos: 'noun',
        }, true);
        expect(token.pos()).to.be.an('object');
        // expect(token.pos()).to.equals('noun');
      });
    });

    describe.skip('parse', function() {
      it('should...', function () {
      });
    });

    describe.skip('ner', function() {
      it('should return the NER given by the JSON API', function () {
        const token = Token.fromJson({
          word: 'loren',
          ner: 'PERSON',
        }, true);
        expect(token.ner()).to.be.a('string');
        expect(token.ner()).to.equals('PERSON');
      });
    });

    describe('fromJson', function() {
      beforeEach(function() {
        token = Token.fromJson({
          word: 'loren',
        }, true);
      });

      it('should initialize words properly', function () {
        expect(token.word()).to.be.a('string');
        expect(token.word()).to.equals('loren');
      });
    });
  });
});
