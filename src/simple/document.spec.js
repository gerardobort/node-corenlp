import Document from './document';
import Sentence from './sentence';
import Annotable from './annotable';

describe('Document', function () {
  let doc;

  beforeEach(function() {
    doc = new Document('loren ipsum dolor sit amet');
  });

  context('SimpleCoreNLP.Document interface', function() {
    it('should follow the SimpleCoreNLP.Document contract', function () {
      expect(doc).to.have.property('sentences').that.is.a('function');
      expect(doc).to.have.property('sentence').that.is.a('function');
      expect(doc).to.have.property('coref').that.is.a('function');
    });

    describe('constructor', function() {
      it('should receive a text', function () {
        expect(doc.toString()).to.equals('loren ipsum dolor sit amet');
      });
    });

    it('should extend from Annotable', function () {
      expect(doc).to.be.an.instanceof(Annotable);
    });
  });

  context('Other methods', function() {
    describe('toString', function() {
      it('should return the given text when it is initialized manually', function () {
        expect(doc.toString()).to.equals('loren ipsum dolor sit amet');
      });

      it('should return the computed text when it is initialized by the JSON API', function () {
        const doc = Document.fromJson({
          sentences: [
            {
              tokens: [
                { word: 'loren' },
                { word: 'ipsum' },
              ],
            },
            {
              tokens: [
                { word: 'dolor' },
                { word: 'sit' },
                { word: 'amet' },
              ],
            },
          ],
        });
        expect(doc.toString()).to.equals('loren ipsum. dolor sit amet');
      });
    });

    describe('sentences / sentence', function() {
      it('should throw an error if there is no annotator', function () {
        expect(() => doc.sentences()).to.throw(Error, /unmet annotator dependencies/);
        expect(() => doc.sentence(0)).to.throw(Error, /unmet annotator dependencies/);
      });

      it('should return the sentences, by first applying ssplit annotator', async function () {
        expect(() => doc.sentences()).to.throw(Error, /unmet annotator dependencies/);
        await doc.applySSplit(); // TODO mock this
        expect(doc.sentences()).to.be.an('array');
        expect(doc.sentences()).to.have.property('0').that.is.instanceof(Sentence);
        expect(doc.sentence(0)).to.be.instanceof(Sentence);
      });

      it('should return the sentences when it is initialized by the JSON API', async function () {
        const doc = Document.fromJson({
          sentences: [
            {
              tokens: [
                { word: 'loren' },
                { word: 'ipsum' },
              ],
            },
            {
              tokens: [
                { word: 'dolor' },
                { word: 'sit' },
                { word: 'amet' },
              ],
            },
          ],
        });
        expect(doc.sentences()).to.be.an('array');
        expect(doc.sentences()).to.have.property('0').that.is.instanceof(Sentence);
        expect(doc.sentence(0)).to.be.instanceof(Sentence);
      });
    });

    describe.skip('coref', function() {
      it('should...', function () {
      });
    });

    describe('fromJson', function() {
      beforeEach(function() {
        doc = Document.fromJson({
          sentences: [
            {
              tokens: [
                { word: 'loren' },
                { word: 'ipsum' },
              ],
            },
            {
              tokens: [
                { word: 'dolor' },
                { word: 'sit' },
                { word: 'amet' },
              ],
            },
          ],
        });
      });

      it('should initialize sentences properly', function () {
        expect(doc.sentences()).to.be.an('array');
        expect(doc.sentences()).to.have.property('0').that.is.instanceof(Sentence);
      });
    });
  });
});
