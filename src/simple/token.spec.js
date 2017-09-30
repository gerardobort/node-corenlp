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
        const token2 = Token.fromJSON({
          word: 'loren',
        });
        expect(token2.toString()).to.equals('loren');
      });
    });

    describe('index', () => {
      it('should return the index that was given by the JSON API', async () => {
        const token2 = Token.fromJSON({
          index: 3,
          word: 'loren',
        });
        expect(token2.index()).to.be.a('number').and.equals(3);
      });
    });

    describe('word', () => {
      it('should return the word that was initialized with', () => {
        expect(token.word()).to.be.a('string').and.equals('loren');
      });

      it('should return the word given by the JSON API', async () => {
        const token2 = Token.fromJSON({
          word: 'loren',
        });
        expect(token2.word()).to.be.a('string').and.equals('loren');
      });
    });

    describe('originalText', () => {
      it('should return the original text given by the JSON API', async () => {
        const token2 = Token.fromJSON({
          originalText: 'loren',
        });
        expect(token2.originalText()).to.be.a('string').and.equals('loren');
      });
    });

    describe('characterOffsetBegin / characterOffsetEnd', () => {
      it('should return the begin / end chars given by the JSON API', async () => {
        const token2 = Token.fromJSON({
          characterOffsetBegin: 24,
          characterOffsetEnd: 26,
        });
        expect(token2.characterOffsetBegin()).to.be.a('number').and.equals(24);
        expect(token2.characterOffsetEnd()).to.be.a('number').and.equals(26);
      });
    });

    describe('before / after', () => {
      it('should return the before and after given by the JSON API', async () => {
        const token2 = Token.fromJSON({
          before: 'a',
          after: 'b',
        });
        expect(token2.before()).to.be.a('string').and.equals('a');
        expect(token2.after()).to.be.a('string').and.equals('b');
      });
    });

    describe('lemma', () => {
      it('should return the lemma given by the JSON API', () => {
        const token2 = Token.fromJSON({
          word: 'loren',
          lemma: 'lor',
        });
        expect(token2.lemma()).to.be.a('string');
        expect(token2.lemma()).to.equals('lor');
      });
    });

    describe('pos', () => {
      it('should return the pos given by the JSON API', () => {
        const token2 = Token.fromJSON({
          word: 'loren',
          pos: 'noun',
        });
        expect(token2.pos()).to.be.a('string');
        expect(token2.pos()).to.equals('noun');
      });
    });

    describe('ner', () => {
      it('should return the NER given by the JSON API', () => {
        const token2 = Token.fromJSON({
          word: 'loren',
          ner: 'PERSON',
        });
        expect(token2.ner()).to.be.a('string');
        expect(token2.ner()).to.equals('PERSON');
      });
    });

    describe('fromJSON / toJSON', () => {
      const tokenJSON = {
        index: 2,
        word: 'loren',
        originalText: 'Loren',
        characterOffsetBegin: 3,
        characterOffsetEnd: 8,
        before: ' ',
        after: ' ',
        pos: 'NNP',
        lemma: 'loren',
        ner: 'PERSON',
      };

      beforeEach(() => {
        token = Token.fromJSON(tokenJSON);
      });

      it('should setup the token properly, feeding the getetr methods correctly', () => {
        expect(token.index()).to.be.a('number').and.equal(2);
        expect(token.word()).to.be.a('string').and.equals('loren');
        expect(token.pos()).to.be.a('string').and.equals('NNP');
        expect(token.lemma()).to.be.a('string').and.equals('loren');
        expect(token.ner()).to.be.a('string').and.equals('PERSON');
      });

      it('should return back the same input json, but not the exact', () => {
        expect(token.toJSON()).to.not.equal(tokenJSON);
        expect(token.toJSON()).to.deep.equal(tokenJSON);
      });
    });
  });
});
