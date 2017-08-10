/**
 * @typedef WordsToSentenceAnnotator
 * @description pipeline: tokenize,ssplit
 * @link SentencesAnnotation
 * @see https://stanfordnlp.github.io/CoreNLP/ssplit.html
 * @property {boolean} eolonly
 * @property {boolean} isOneSentence
 * @property {(always|never|two)} newlineIsSentenceBreak
 * @property {RegExp} boundaryMultiTokenRegex
 * @property {RegExp} boundaryTokenRegex
 * @property {Array.<string>} boundariesToDiscard
 * @property {string} htmlBoundariesToDiscard
 * @property {Array.<RegExp>} tokenPatternsToDiscard
 * @property {RegExp} boundaryFollowersRegex
 */
