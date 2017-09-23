import DependencyParseAnnotator from './depparse';

describe('Annotator', () => {
  let annotator;

  describe('DependencyParseAnnotator', () => {
    beforeEach(() => {
      annotator = new DependencyParseAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'depparse']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
      });
    });
  });
});
