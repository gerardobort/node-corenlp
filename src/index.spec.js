import SimpleCoreNLP from '.';

// TODO move these tests to a different place, and refactor!

describe('CoreNLP Library entry point', () => {
  describe('SimpleCoreNLP.Document', async () => {
    let doc;
    before(async () => {
      doc = new SimpleCoreNLP.Document('El pájaro veloz come kiwi. Los árboles se mecen sobre la faz de la tierra.');
      await doc.applySSplit();
    });

    it('should split a document into sentences: SimpleCoreNLP.SentencesAnnotation', async () => {
      expect(doc.sentences()).to.be.an('array');
    });

    describe('SimpleCoreNLP.SentencesAnnotation', async () => {
      it('should be iterable: SimpleCoreNLP.Sentence', async () => {
        for (const sent of doc.sentences()) {
          expect(sent).to.be.instanceof(SimpleCoreNLP.Sentence);
        }
        expect([...doc.sentences()][0]).to.be.instanceof(SimpleCoreNLP.Sentence);
        expect([...doc.sentences()][1]).to.be.instanceof(SimpleCoreNLP.Sentence);
        expect(doc.sentence(0)).to.be.instanceof(SimpleCoreNLP.Sentence);
        expect(doc.sentence(1)).to.be.instanceof(SimpleCoreNLP.Sentence);
      });

      describe('SimpleCoreNLP.Sentence', async () => {
        it('should cast to the sentence text: String', async () => {
          expect(doc.sentence(0).toString()).to.equals('" El pájaro veloz come kiwi .');
          expect(doc.sentence(1).toString()).to.equals('Los árboles se mecen sobre la faz de la tierra . "');
        });
      });
    });
  });

  describe('SimpleCoreNLP.Sentence', async () => {
    let sent;
    before(async () => {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      await sent.applyLemma();
    });

    it('should lemmatize a sentence: SimpleCoreNLP.LemmaAnnotation', async () => {
      expect(sent.lemmas()).to.be.an('array');
    });

    describe('SimpleCoreNLP.LemmaAnnotation', async () => {
      describe('SimpleCoreNLP.Sentence', async () => {
        it('should cast to the sentence text: String', async () => {
          expect(sent.toString()).to.equals('El pájaro veloz come kiwi.');
        });

        it('should provide per token info', async () => {
          for (const token of sent) {
            expect(token).to.be.instanceof(SimpleCoreNLP.Token);
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

  describe('SimpleCoreNLP.NERAnnotation', async () => {
    let sent;
    before(async () => {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      await sent.applyNER();
    });

    it('should provide per token info', async () => {
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
      }
    });
  });

  describe('SimpleCoreNLP.ParseAnnotation', async () => {
    let sent;
    before(async () => {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      await sent.applyParse();
    });

    it('should provide per token info', async () => {
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
      }
    });
  });

  describe('SimpleCoreNLP.DepParseAnnotation', async () => {
    let sent;
    before(async () => {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      await sent.applyDepParse();
    });

    it('should provide per token info', async () => {
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
      }
    });
  });

  describe.skip('SimpleCoreNLP.RelationAnnotation', async () => {
    let sent;
    before(async () => {
      sent = new SimpleCoreNLP.Sentence('El pájaro veloz come kiwi.');
      await sent.applyRelation();
    });

    it('should provide per token info', async () => {
      for (const token of sent) {
        expect(token).to.be.instanceof(SimpleCoreNLP.Token);
      }
    });
  });
});
