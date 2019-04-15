import OpenIEAnnotator from './openie';

describe('Annotator', () => {
  let annotator;

  describe('OpenIEAnnotator', () => {
    beforeEach(() => {
      annotator = new OpenIEAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'depparse', 'natlog', 'openie']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
      });
    });
  });
});
