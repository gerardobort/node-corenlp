import NaturalLogicAnnotator from './natlog';

describe('Annotator', () => {
  let annotator;

  describe('NaturalLogicAnnotator', () => {
    beforeEach(() => {
      annotator = new NaturalLogicAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'depparse', 'natlog']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
      });
    });
  });
});