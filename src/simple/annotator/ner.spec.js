import Annotator from '../annotator';
import NERClassifierCombiner from './ner';

describe('Annotator', () => {
  let annotator;

  describe('NERClassifierCombiner', () => {
    beforeEach(() => annotator = new NERClassifierCombiner());

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
        useSUTime: true,
        // model: null,
        applyNumericClassifiers: true,
      });
    });
  });
});
