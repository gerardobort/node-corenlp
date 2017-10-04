import Document from './document';
import Sentence from './sentence';
import Annotable from './annotable';

describe('Document', () => {
  let doc;

  beforeEach(() => {
    doc = new Document('loren ipsum dolor sit amet');
  });

  context('CoreNLP.Document interface', () => {
    it('should follow the CoreNLP.Document contract', () => {
      expect(doc).to.have.property('sentences').that.is.a('function');
      expect(doc).to.have.property('sentence').that.is.a('function');
      expect(doc).to.have.property('coref').that.is.a('function');
    });

    describe('constructor', () => {
      it('should receive a text', () => {
        expect(doc.toString()).to.equals('loren ipsum dolor sit amet');
      });
    });

    it('should extend from Annotable', () => {
      expect(doc).to.be.an.instanceof(Annotable);
    });
  });

  context('Other methods', () => {
    describe('toString', () => {
      it('should return the given text when it is initialized manually', () => {
        expect(doc.toString()).to.equals('loren ipsum dolor sit amet');
      });

      it('should return the computed text when it is initialized by the JSON API', () => {
        const doc2 = Document.fromJSON({
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
        expect(doc2.toString()).to.equals('loren ipsum. dolor sit amet');
      });
    });

    describe('sentences / sentence', () => {
      it('should throw an error if there is no annotator', () => {
        expect(() => doc.sentences()).to.throw(Error, /unmet annotator dependencies/);
        expect(() => doc.sentence(0)).to.throw(Error, /unmet annotator dependencies/);
      });

      it('should return the sentences, by first applying ssplit annotator', async () => {
        expect(() => doc.sentences()).to.throw(Error, /unmet annotator dependencies/);
        doc.fromJSON({
          sentences: [
            {
              tokens: [
                { word: 'loren' },
                { word: 'ipsum' },
              ],
            },
          ],
        });
        expect(doc.sentences()).to.be.an('array');
        expect(doc.sentences()).to.have.property('0').that.is.instanceof(Sentence);
        expect(doc.sentence(0)).to.be.instanceof(Sentence);
      });

      it('should return the sentences when it is initialized by the JSON API', async () => {
        const doc2 = Document.fromJSON({
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
        expect(doc2.sentences()).to.be.an('array');
        expect(doc2.sentences()).to.have.property('0').that.is.instanceof(Sentence);
        expect(doc2.sentence(0)).to.be.instanceof(Sentence);
      });
    });

    describe.skip('coref', () => {
      it('should...', () => {
      });
    });

    describe('setLanguageISO / getLanguageISO', () => {
      it('should default to undefined', () => {
        expect(doc.getLanguageISO()).to.be.undefined;
      });

      it('should receive and return wthe language as indicated', () => {
        doc.setLanguageISO('es');
        expect(doc.getLanguageISO('es')).to.equal('es');
      });

      it('should propagate the language to its sentences', () => {
        const dummySentence = { setLanguageISO: sinon.stub() };
        doc._sentences = [dummySentence];
        doc.setLanguageISO('es');
        expect(doc.getLanguageISO('es')).to.equal('es');
        expect(dummySentence.setLanguageISO).to.have.been.calledOnce.and.calledWith('es');
      });
    });

    describe('fromJSON', () => {
      beforeEach(() => {
        doc = Document.fromJSON({
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

      it('should initialize sentences properly', () => {
        expect(doc.sentences()).to.be.an('array');
        expect(doc.sentences()).to.have.property('0').that.is.instanceof(Sentence);
      });
    });
  });
});
