'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
const expect = chai.expect;
chai.use(sinonChai);

import SimpleCoreNLP from '../src';

describe('CoreNLP Library entry point', function () {
  it('should follow the documented contract: SimpleCoreNLP', function () {
    expect(SimpleCoreNLP).to.have.property('Document').that.is.a('function');
    expect(SimpleCoreNLP).to.have.property('Sentence').that.is.a('function');
  });

  it('should follow the documented contract: SimpleCoreNLP.Document', function () {
    const doc = new SimpleCoreNLP.Document('loren ipsum dolor sit amet');
    expect(doc).to.have.property('sentences').that.is.a('function');
    expect(doc).to.have.property('sentence').that.is.a('function');
    expect(doc).to.have.property('coref').that.is.a('function');
  });

  it('should follow the documented contract: SimpleCoreNLP.Sentence', function () {
    const sent = new SimpleCoreNLP.Sentence('loren ipsum dolor sit amet');
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

  describe('SimpleCoreNLP.Document', async function () {
    let doc;
    before(async function () {
      doc = new SimpleCoreNLP.Document('El pájaro veloz come kiwi. Los árboles se mecen sobre la faz de la tierra.');
      await doc.applySsplit();
    });

    it('should split a document into sentences: SimpleCoreNLP.SentencesAnnotation', async function () {
      expect(doc.sentences()).to.be.an('array');
    });

    describe('SimpleCoreNLP.SentencesAnnotation', async function () {
      it('should be iterable: SimpleCoreNLP.Sentence', async function () {
        for (const sent of doc.sentences()) {
          expect(sent).to.be.instanceof(SimpleCoreNLP.Sentence);
        }
        expect([...doc.sentences()][0]).to.be.instanceof(SimpleCoreNLP.Sentence);
        expect([...doc.sentences()][1]).to.be.instanceof(SimpleCoreNLP.Sentence);
        expect(doc.sentence(0)).to.be.instanceof(SimpleCoreNLP.Sentence);
        expect(doc.sentence(1)).to.be.instanceof(SimpleCoreNLP.Sentence);
      });

      describe('SimpleCoreNLP.Sentence', async function () {
        it('should cast to the sentence text: String', async function () {
          expect(doc.sentence(0).toString()).to.equals('" El pájaro veloz come kiwi .');
          expect(doc.sentence(1).toString()).to.equals('Los árboles se mecen sobre la faz de la tierra . "');
        });
      });
    });
  });

  describe('SimpleCoreNLP.Sentence', async function () {
    let sent;
    before(async function () {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      await sent.applyLemma();
    });

    it('should lemmatize a sentence: SimpleCoreNLP.LemmaAnnotation', async function () {
      expect(sent.lemmas()).to.be.an('array');
    });

    describe('SimpleCoreNLP.LemmaAnnotation', async function () {
      describe('SimpleCoreNLP.Sentence', async function () {
        it('should cast to the sentence text: String', async function () {
          expect(sent.toString()).to.equals('El pájaro veloz come kiwi.');
        });

        it('should provide per token info', async function () {
          for (const token of sent) {
            expect(token).to.be.instanceof(SimpleCoreNLP.Token);
            // console.log('token', token.word(), token.lemma(), token.pos());
          }
          for (const word of sent.words()) {
            expect(word).to.be.a('string');
          }
          for (const lemma of sent.lemmas()) {
            expect(lemma).to.be.a('string');
          }
        });
      });
    });
  });

  describe('SimpleCoreNLP.NERAnnotation', async function () {
    let sent;
    before(async function () {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      await sent.applyNER();
    });

    it('should provide per token info', async function () {
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
        console.log('token', token.word(), token.lemma(), token.ner());
      }
    });
  });

  describe('SimpleCoreNLP.ParseAnnotation', async function () {
    let sent;
    before(async function () {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      console.log('parse>>>>')
      return await sent.applyParse();
    });

    it('should provide per token info', async function () {
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
        console.log('token', token.word(), token.lemma(), token.ner());
      }
    });
  });

  describe('SimpleCoreNLP.DepParseAnnotation', async function () {
    let sent;
    before(async function () {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      console.log('depparse>>>>')
      return await sent.applyDepParse();
    });

    it('should provide per token info', async function () {
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
        console.log('token', token.word(), token.lemma(), token.ner());
      }
    });
  });

  describe.skip('SimpleCoreNLP.RelationAnnotation', async function () {
    let sent;
    before(async function () {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      console.log('relation>>>>')
      return await sent.applyRelation();
    });

    it('should provide per token info', async function () {
      console.log('sent', sent);
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
        console.log('token', token.word(), token.lemma(), token.ner());
      }
    });
  });
});
