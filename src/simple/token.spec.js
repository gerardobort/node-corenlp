import Token from './token';

describe('Token', () => {
  let token;

  beforeEach(() => {
    token = new Token('loren');
  });

  context('CoreNLP.Token interface', () => {
    it('should follow the CoreNLP.Token contract', () => {
      // no contract
    });

    describe('constructor', () => {
      it('should receive a text', () => {
        expect(token.toString()).to.equals('loren');
      });
    });
  });

  context('Other methods', () => {
    describe('toString', () => {
      it('should return the given text', () => {
        expect(token.toString()).to.equals('loren');
      });

      it('should return the computed text when it is initialized by the JSON API', () => {
        const token2 = Token.fromJson({
          word: 'loren',
        }, true);
        expect(token2.toString()).to.equals('loren');
      });
    });

    describe('index', () => {
      it('should return the index that was given by the JSON API', async () => {
        const token2 = Token.fromJson({
          index: 3,
          word: 'loren',
        }, true);
        expect(token2.index()).to.be.a('number');
        expect(token2.index()).to.equals(3);
      });
    });

    describe('word', () => {
      it('should return the word that was initialized with', () => {
        expect(token.word()).to.be.a('string');
        expect(token.word()).to.equals('loren');
      });

      it('should return the word given by the JSON API', async () => {
        const token2 = Token.fromJson({
          word: 'loren',
        }, true);
        expect(token2.word()).to.be.a('string');
        expect(token2.word()).to.equals('loren');
      });
    });

    describe('lemma', () => {
      it('should return the lemma given by the JSON API', () => {
        const token2 = Token.fromJson({
          word: 'loren',
          lemma: 'lor',
        }, true);
        expect(token2.lemma()).to.be.a('string');
        expect(token2.lemma()).to.equals('lor');
      });
    });

    describe.skip('pos', () => {
      it('should return the pos given by the JSON API', () => {
        const token2 = Token.fromJson({
          word: 'loren',
          pos: 'noun',
        }, true);
        expect(token2.pos()).to.be.an('object');
        // expect(token.pos()).to.equals('noun');
      });
    });

    describe.skip('parse', () => {
      it('should...', () => {
      });
    });

    describe.skip('ner', () => {
      it('should return the NER given by the JSON API', () => {
        const token2 = Token.fromJson({
          word: 'loren',
          ner: 'PERSON',
        }, true);
        expect(token2.ner()).to.be.a('string');
        expect(token2.ner()).to.equals('PERSON');
      });
    });

    describe('fromJson', () => {
      beforeEach(() => {
        token = Token.fromJson({
          word: 'loren',
        }, true);
      });

      it('should initialize words properly', () => {
        expect(token.word()).to.be.a('string');
        expect(token.word()).to.equals('loren');
      });
    });
  });
});
