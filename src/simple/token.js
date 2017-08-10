export default class Token {
  constructor(word) {
    this._word = word;
  }

  parse() {
  }

  word() {
    return this._word;
  }
}

/**
 * @typedef Token
 * @property {number} index
 * @property {string} word
 * @property {string} originalText
 * @property {number} characterOffsetBegin
 * @property {number} characterOffsetEnd
 * @property {string} before
 * @property {string} after
 */
Token.fromJson = function (data) {
  const instance = new this();
  instance._word = data.word;
  instance._originalText = data.originalText;
  instance._characterOffsetBegin = data.characterOffsetBegin;
  instance._characterOffsetEnd = data.characterOffsetEnd;
  instance._before = data.before;
  instance._after = data.after;
  instance._pos = data.pos;
  instance._lemma = data.lemma;
  return instance;
};
