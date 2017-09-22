import RegexNERAnnotator from './regexner';

describe('Annotator', () => {
  let annotator;

  describe('RegexNERAnnotator', () => {
    beforeEach(() => {
      annotator = new RegexNERAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit', 'regexner']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
        validpospattern: '(([ner:PERSON]*) /es/ /una/ /buena/ /persona/)',
        verbose: true,
      });
    });
  });
});
