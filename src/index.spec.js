import SimpleCoreNLP from '.';

// TODO move these tests to a different place, and refactor!

describe('CoreNLP Library entry point', function () {
  describe('SimpleCoreNLP.Document', async function () {
    let doc;
    before(async function () {
      doc = new SimpleCoreNLP.Document('El pájaro veloz come kiwi. Los árboles se mecen sobre la faz de la tierra.');
      await doc.applySSplit();
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
      console.log('sent', sent);
      console.log('sent', sent.governor(3).dep());
      console.log('sent', sent.governor(3).governorGloss());
      console.log('sent', sent.governor(3).dependentGloss());
      console.log('sent', sent.parse());
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
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
        console.log('token', token.word(), token.lemma(), token.ner());
      }
    });
  });
});
