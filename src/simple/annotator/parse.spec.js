import Annotator from '../annotator';
import ParserAnnotator from './parse';

describe('Annotator', () => {
  let annotator;

  describe('ParserAnnotator', () => {
    beforeEach(() => annotator = new ParserAnnotator());

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
      });
    });
  });
});
