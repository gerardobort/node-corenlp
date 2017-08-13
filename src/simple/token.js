import Service from './service';

export default class Token {
  constructor(word) {
    this._word = word;
  }

  toString() {
    return this._word;
  }

  index() {
    return this._index;
  }

  word() {
    return this._word;
  }

  lemma() {
    return this._lemma;
  }

  pos() {
    return Service.getTokenPosInfo(this._pos);
  }

  parse() {
    return this._parse;
  }

  ner() {
    return this._ner;
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
  instance._index = data.index;
  instance._word = data.word;
  instance._originalText = data.originalText;
  instance._characterOffsetBegin = data.characterOffsetBegin;
  instance._characterOffsetEnd = data.characterOffsetEnd;
  instance._before = data.before;
  instance._after = data.after;
  // annotations metadata
  instance._pos = data.pos;
  instance._lemma = data.lemma;
  instance._ner = data.ner;
  return instance;
};
