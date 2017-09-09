import Annotator from '../annotator';
import TokenizerAnnotator from './tokenize';

describe('Annotator', () => {
  let annotator;

  describe('TokenizerAnnotator', () => {
    beforeEach(() => annotator = new TokenizerAnnotator());

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
        language: 'Unspecified',
        // class: null,
        whitespace: false,
        keepeol: false,
        // options: null,
        verbose: false,
      });
    });
  });
});
