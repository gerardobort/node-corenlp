import WordsToSentenceAnnotator from './ssplit';

describe('Annotator', () => {
  let annotator;

  describe('WordsToSentenceAnnotator', () => {
    beforeEach(() => {
      annotator = new WordsToSentenceAnnotator();
    });

    it('should have a proper pipeline', () => {
      expect(annotator.pipeline()).to.deep.equal(['tokenize', 'ssplit']);
    });

    it('should have the proper default options', () => {
      expect(annotator.options()).to.deep.equal({
        eolonly: false,
        isOneSentence: false,
        newlineIsSentenceBreak: 'never',
        boundaryMultiTokenRegex: null,
        boundaryTokenRegex: '\\.|[!?]+',
        boundariesToDiscard: null,
        htmlBoundariesToDiscard: null,
        tokenPatternsToDiscard: null,
        boundaryFollowersRegex: null,
      });
    });
  });
});
