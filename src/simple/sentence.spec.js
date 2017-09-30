import Sentence from './sentence';
import Annotable from './annotable';
import Token from './token';
import Governor from './governor';
import sentenceStubJson from './sentence.stub.json';

describe('Sentence', () => {
  let sent;

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
        const sent2 = Sentence.fromJSON({
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

    describe('index', () => {
      it('should return the given index when it is initialized by the JSON API', () => {
        const sent2 = Sentence.fromJSON({
          index: 3,
          tokens: [
            { word: 'loren' },
          ],
        }, true);
        expect(sent2.index()).to.be.a('number').and.equals(3);
      });
    });

    describe('words / word', () => {
      it('should throw an error if there is no annotator', () => {
        expect(() => sent.words()).to.throw(Error, /unmet annotator dependencies/);
        expect(() => sent.word(0)).to.throw(Error, /unmet annotator dependencies/);
      });

      it('should throw an error if the index is out of range', () => {
        sent.fromJSON({
          sentences: [
            {
              tokens: [
                { word: 'loren' },
              ],
            },
          ],
        });
        expect(() => sent.word(1)).to.throw(Error, /does not contain a token with index 1/);
      });

      it('should return the words, by first applying ssplit annotator', async () => {
        expect(() => sent.words()).to.throw(Error, /unmet annotator dependencies/);
        sent.fromJSON({
          sentences: [
            {
              tokens: [
                { word: 'loren' },
              ],
            },
          ],
        });
        expect(sent.words()).to.be.an('array');
        expect(sent.words()).to.have.property('0').that.is.a('string');
        expect(sent.word(0)).to.be.a('string');
      });

      it('should return the words when it is initialized by the JSON API', async () => {
        const sent2 = Sentence.fromJSON({
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

    describe('posTags / posTag', () => {
      it('should return the sentence posTags', () => {
        const sent2 = Sentence.fromJSON({
          tokens: [
            { word: 'loren', pos: 'NN' },
            { word: 'ipsum', pos: 'NN' },
            { word: 'John', pos: 'NNP' },
          ],
        }, true);
        expect(sent2.posTags()).to.deep.equal(['NN', 'NN', 'NNP']);
      });

      it('should return the sentence posTag for a given index', () => {
        const sent2 = Sentence.fromJSON({
          tokens: [
            { word: 'loren', pos: 'NN' },
            { word: 'ipsum', pos: 'NN' },
            { word: 'John', pos: 'NNP' },
          ],
        }, true);
        expect(sent2.posTag(2)).to.equal('NNP');
      });

      it('should throw an error if the index is out of range', () => {
        sent.fromJSON({
          sentences: [
            {
              tokens: [
                { word: 'loren', pos: 'NN' },
              ],
            },
          ],
        });
        expect(() => sent.posTag(1)).to.throw(Error, /does not contain a token with index 1/);
      });
    });

    describe('lemmas / lemma', () => {
      it('should return the sentence lemmas', () => {
        const sent2 = Sentence.fromJSON({
          tokens: [
            { word: 'loren', lemma: 'lore' },
            { word: 'ipsum', lemma: 'ipsu' },
            { word: 'John', lemma: 'john' },
          ],
        }, true);
        expect(sent2.lemmas()).to.deep.equal(['lore', 'ipsu', 'john']);
      });

      it('should return the sentence lemma for a given index', () => {
        const sent2 = Sentence.fromJSON({
          tokens: [
            { word: 'loren', lemma: 'lore' },
            { word: 'ipsum', lemma: 'ipsu' },
            { word: 'John', lemma: 'john' },
          ],
        }, true);
        expect(sent2.lemma(2)).to.equal('john');
      });

      it('should throw an error if the index is out of range', () => {
        sent.fromJSON({
          sentences: [
            {
              tokens: [
                { word: 'loren', lemma: 'lore' },
              ],
            },
          ],
        });
        expect(() => sent.lemma(1)).to.throw(Error, /does not contain a token with index 1/);
      });
    });

    describe('nerTags / nerTag', () => {
      it('should return the sentence nerTags', () => {
        const sent2 = Sentence.fromJSON({
          tokens: [
            { word: 'loren', ner: 'O' },
            { word: 'ipsum', ner: 'O' },
            { word: 'John', ner: 'PERSON' },
          ],
        }, true);
        expect(sent2.nerTags()).to.deep.equal(['O', 'O', 'PERSON']);
      });

      it('should return the sentence nerTag for a given index', () => {
        const sent2 = Sentence.fromJSON({
          tokens: [
            { word: 'loren', ner: 'O' },
            { word: 'ipsum', ner: 'O' },
            { word: 'John', ner: 'PERSON' },
          ],
        }, true);
        expect(sent2.nerTag(2)).to.equal('PERSON');
      });

      it('should throw an error if the index is out of range', () => {
        sent.fromJSON({
          sentences: [
            {
              tokens: [
                { word: 'loren', ner: 'lore' },
              ],
            },
          ],
        });
        expect(() => sent.nerTag(1)).to.throw(Error, /does not contain a token with index 1/);
      });
    });

    describe('governors / governor', () => {
      let sent2;
      beforeEach(() => {
        sent2 = Sentence.fromJSON({
          tokens: [
            { word: 'happy' },
            { word: 'cat' },
          ],
          basicDependencies: [
            { dep: 'ROOT', dependent: 2, dependentGloss: 'cat', governor: 0, governorGloss: 'ROOT' },
            { dep: 'amod', dependent: 1, dependentGloss: 'happy', governor: 2, governorGloss: 'cat' },
          ],
        }, true);
      });

      it('should return the sentence governors as a list of its individual governors', () => {
        expect(sent2.governors()[0]).to.be.instanceof(Governor).that.equals(sent2.governor(0));
        expect(sent2.governors()[1]).to.be.instanceof(Governor).that.equals(sent2.governor(1));
        expect(sent2.governors()).to.deep.equal([
          sent2.governor(0),
          sent2.governor(1),
        ]);
      });

      it('should confoirm an individual governors with proper Governor instances', () => {
        expect(sent2.governor(0).dep()).to.equal('ROOT');
        expect(sent2.governor(0).governor()).to.be.null;
        expect(sent2.governor(0).governorGloss()).to.be.equal('');
        expect(sent2.governor(0).dependent()).to.deep.equal(sent2.token(1));
        expect(sent2.governor(0).dependentGloss()).to.equal('cat');
        expect(sent2.governor(1).dep()).to.equal('amod');
        expect(sent2.governor(1).governor()).to.deep.equal(sent2.token(1));
        expect(sent2.governor(1).governorGloss()).to.equal('cat');
        expect(sent2.governor(1).dependent()).to.deep.equal(sent2.token(0));
        expect(sent2.governor(1).dependentGloss()).to.equal('happy');
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
        sent.fromJSON({
          sentences: [
            {
              tokens: [
                { token: 'loren' },
              ],
            },
          ],
        });
        expect(sent.tokens()).to.be.an('array');
        expect(sent.tokens()).to.have.property('0').that.is.instanceof(Token);
        expect(sent.token(0)).to.be.instanceof(Token);
      });

      it('should return the tokens when it is initialized by the JSON API', async () => {
        const sent2 = Sentence.fromJSON({
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

    describe.skip('algorithms', () => {
      it('should...', () => {
      });
    });

    describe('fromJSON', () => {
      beforeEach(() => {
        sent = Sentence.fromJSON(sentenceStubJson, true);
      });

      it('should make fromJSON -> toJSON idempotent', () => {
        expect(sent.toJSON()).to.deep.equal(sentenceStubJson);
      });
    });
  });
});
