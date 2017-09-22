import DeterministicCorefAnnotator from './dcoref';

describe('Annotator', () => {
  let annotator;

  describe('DeterministicCorefAnnotator', () => {
    beforeEach(() => {
      annotator = new DeterministicCorefAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse', 'dcoref']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
      });
    });
  });
});
