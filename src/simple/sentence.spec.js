import Sentence from './sentence';
import Annotable from './annotable';

describe('Sentence', function () {
  let sent;

  beforeEach(function() {
    sent = new Sentence('loren ipsum dolor sit amet');
  });

  context('SimpleCoreNLP.Sentence interface', function() {
    it('should follow the SimpleCoreNLP.Sentence contract', function () {
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

    describe('constructor', function() {
      it('should receive a text', function () {
        expect(sent.toString()).to.equals('loren ipsum dolor sit amet');
      });
    });

    it('should extend from Annotable', function () {
      expect(sent).to.be.an.instanceof(Annotable);
    });
  });

  context('Other methods', function() {
    describe('toString', function() {
      it('should return the given text when it is initialized manually', function () {
        expect(sent.toString()).to.equals('loren ipsum dolor sit amet');
      });

      it('should return the computed text when it is initialized by the JSON API', function () {
        const sent = Sentence.fromJson({
            tokens: [
              { word: 'loren' },
              { word: 'ipsum' },
              { word: 'dolor' },
              { word: 'sit' },
              { word: 'amet' },
            ],
        }, true);
        expect(sent.toString()).to.equals('loren ipsum dolor sit amet');
      });
    });

    describe('words / word', function() {
      it('should throw an error if there is no annotator', function () {
        expect(() => sent.words()).to.throw(Error, /unmet annotator dependencies/);
        expect(() => sent.word(0)).to.throw(Error, /unmet annotator dependencies/);
      });

      it('should return the words, by first applying ssplit annotator', async function () {
        expect(() => sent.words()).to.throw(Error, /unmet annotator dependencies/);
        await sent.applySSplit(); // TODO mock this
        expect(sent.words()).to.be.an('array');
        expect(sent.words()).to.have.property('0').that.is.a('string');
        expect(sent.word(0)).to.be.a('string');
      });

      it('should return the words when it is initialized by the JSON API', async function () {
        const sent = Sentence.fromJson({
          tokens: [
            { word: 'loren' },
            { word: 'ipsum' },
          ],
        }, true);
        expect(sent.words()).to.be.an('array');
        expect(sent.words()).to.have.property('0').that.is.a('string');
        expect(sent.word(0)).to.be.a('string');
      });
    });

    describe.skip('posTags / posTag', function() {
      it('should...', function () {
      });
    });

    describe.skip('lemmas / lemma', function() {
      it('should...', function () {
      });
    });

    describe.skip('nerTags / nerTag', function() {
      it('should...', function () {
      });
    });

    describe.skip('governors / governor', function() {
      it('should...', function () {
      });
    });

    describe.skip('incommingDependencyLabel', function() {
      it('should...', function () {
      });
    });

    describe.skip('natlogPolarities / natlogPolarity', function() {
      it('should...', function () {
      });
    });

    describe.skip('openie / openieTriples', function() {
      it('should...', function () {
      });
    });

    describe('fromJson', function() {
      beforeEach(function() {
        sent = Sentence.fromJson({
          tokens: [
            { word: 'loren' },
            { word: 'ipsum' },
          ],
        }, true);
      });

      it('should initialize words properly', function () {
        expect(sent.words()).to.be.an('array');
        expect(sent.words()).to.have.property('0').that.is.a('string');
      });
    });
  });
});
