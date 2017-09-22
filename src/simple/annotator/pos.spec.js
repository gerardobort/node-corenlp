import Annotator from '../annotator';
import POSTaggerAnnotator from './pos';

describe('Annotator', () => {
  let annotator;

  describe('POSTaggerAnnotator', () => {
    beforeEach(() => annotator = new POSTaggerAnnotator());

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos']);
    });
  });
});
