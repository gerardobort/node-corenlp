import RelationExtractorAnnotator from './relation';

describe('Annotator', () => {
  let annotator;

  describe('RelationExtractorAnnotator', () => {
    beforeEach(() => {
      annotator = new RelationExtractorAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'depparse', 'relation']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
      });
    });
  });
});
