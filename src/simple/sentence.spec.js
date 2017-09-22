import CoreNLP from '..';
import Sentence from './sentence';
import Annotable from './annotable';
import Token from './token';
import WordsToSentenceAnnotator from './annotator/ssplit';

describe('Sentence', () => {
  let connectorMock;
  let sent;

  before(() => {
    connectorMock = { get: sinon.stub() };
    CoreNLP.setup(null, connectorMock);
  });

  beforeEach(() => {
    sent = new Sentence('loren ipsum dolor sit amet');
  });

  context('CoreNLP.Sentence interface', () => {
    it('should follow the CoreNLP.Sentence contract', () => {
      expect(sent).to.have.property('parse').that.is.a('function');
      expect(sent).to.have.property('words').that.is.a('function');
      expect(sent).to.have.property('word').that.is.a('function');
      expect(sent).to.have.property('posTags').that.is.a('function');
      expect(sent).to.have.property('posTag').that.is.a('function');
      expect(sent).to.have.property('lemmas').that.is.a('function');
      expect(sent).to.have.property('lemma').that.is.a('function');
      expect(sent).to.have.property('nerTags').that.is.a('function');
      expect(sent).to.have.property('nerTag').that.is.a('function');
      expect(sent).to.have.property('governor').that.is.a('function');
      expect(sent).to.have.property('incommingDependencyLabel').that.is.a('function');
      expect(sent).to.have.property('natlogPolarities').that.is.a('function');
      expect(sent).to.have.property('natlogPolarity').that.is.a('function');
      expect(sent).to.have.property('openie').that.is.a('function');
      expect(sent).to.have.property('openieTriples').that.is.a('function');
      expect(sent).to.have.property('algorithms').that.is.a('function');
    });

    describe('constructor', () => {
      it('should receive a text', () => {
        expect(sent.toString()).to.equals('loren ipsum dolor sit amet');
      });
    });

    it('should extend from Annotable', () => {
      expect(sent).to.be.an.instanceof(Annotable);
    });
  });

  context('Other methods', () => {
    describe('toString', () => {
      it('should return the given text when it is initialized manually', () => {
        expect(sent.toString()).to.equals('loren ipsum dolor sit amet');
      });

      it('should return the computed text when it is initialized by the JSON API', () => {
        const sent2 = Sentence.fromJson({
          tokens: [
            { word: 'loren' },
            { word: 'ipsum' },
            { word: 'dolor' },
            { word: 'sit' },
            { word: 'amet' },
          ],
        }, true);
        expect(sent2.toString()).to.equals('loren ipsum dolor sit amet');
      });
    });

    describe('words / word', () => {
      it('should throw an error if there is no annotator', () => {
        expect(() => sent.words()).to.throw(Error, /unmet annotator dependencies/);
        expect(() => sent.word(0)).to.throw(Error, /unmet annotator dependencies/);
      });

      it('should return the words, by first applying ssplit annotator', async () => {
        expect(() => sent.words()).to.throw(Error, /unmet annotator dependencies/);
        connectorMock.get.returns(Promise.resolve({
          sentences: [
            {
              tokens: [
                { word: 'loren' },
              ],
            },
          ],
        }));
        await sent.applyAnnotator(WordsToSentenceAnnotator);
        expect(sent.words()).to.be.an('array');
        expect(sent.words()).to.have.property('0').that.is.a('string');
        expect(sent.word(0)).to.be.a('string');
      });

      it('should return the words when it is initialized by the JSON API', async () => {
        const sent2 = Sentence.fromJson({
          tokens: [
            { word: 'loren' },
            { word: 'ipsum' },
          ],
        }, true);
        expect(sent2.words()).to.be.an('array');
        expect(sent2.words()).to.have.property('0').that.is.a('string');
        expect(sent2.word(0)).to.be.a('string');
      });
    });

    describe.skip('posTags / posTag', () => {
      it('should...', () => {
      });
    });

    describe.skip('lemmas / lemma', () => {
      it('should...', () => {
      });
    });

    describe.skip('nerTags / nerTag', () => {
      it('should...', () => {
      });
    });

    describe.skip('governors / governor', () => {
      it('should...', () => {
      });
    });

    describe.skip('incommingDependencyLabel', () => {
      it('should...', () => {
      });
    });

    describe.skip('natlogPolarities / natlogPolarity', () => {
      it('should...', () => {
      });
    });

    describe.skip('openie / openieTriples', () => {
      it('should...', () => {
      });
    });

    describe('tokens / token', () => {
      it('should throw an error if there is no annotator', () => {
        expect(() => sent.tokens()).to.throw(Error, /unmet annotator dependencies/);
        expect(() => sent.token(0)).to.throw(Error, /unmet annotator dependencies/);
      });

      it('should return the tokens, by first applying ssplit annotator', async () => {
        expect(() => sent.tokens()).to.throw(Error, /unmet annotator dependencies/);
        connectorMock.get.returns(Promise.resolve({
          sentences: [
            {
              tokens: [
                { token: 'loren' },
              ],
            },
          ],
        }));
        await sent.applyAnnotator(WordsToSentenceAnnotator);
        expect(sent.tokens()).to.be.an('array');
        expect(sent.tokens()).to.have.property('0').that.is.instanceof(Token);
        expect(sent.token(0)).to.be.instanceof(Token);
      });

      it('should return the tokens when it is initialized by the JSON API', async () => {
        const sent2 = Sentence.fromJson({
          tokens: [
            { token: 'loren' },
            { token: 'ipsum' },
          ],
        }, true);
        expect(sent2.tokens()).to.be.an('array');
        expect(sent2.tokens()).to.have.property('0').that.is.instanceof(Token);
        expect(sent2.token(0)).to.be.instanceof(Token);
      });
    });

    describe('fromJson', () => {
      beforeEach(() => {
        sent = Sentence.fromJson({
          tokens: [
            { word: 'loren' },
            { word: 'ipsum' },
          ],
        }, true);
      });

      it('should initialize words properly', () => {
        expect(sent.words()).to.be.an('array');
        expect(sent.words()).to.have.property('0').that.is.a('string');
      });
    });
  });
});
