import MorphaAnnotator from './lemma';

describe('Annotator', () => {
  let annotator;

  describe('MorphaAnnotator', () => {
    beforeEach(() => {
      annotator = new MorphaAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma']);
    });
  });
});
