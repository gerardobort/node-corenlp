import CorefAnnotator from './coref';

describe('Annotator', () => {
  let annotator;

  describe('CorefAnnotator', () => {
    beforeEach(() => {
      annotator = new CorefAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'coref']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
      });
    });
  });
});
