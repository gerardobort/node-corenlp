export default class Annotation {
  constructor(text) {
    this.text = text;
  }

  sentences() {
    return this._sentences;
  }

  sentence(index) {
    return this._sentences[index];
  }

  [Symbol.iterator]() {
    return this._sentences.values();
  }
}

Annotation.fromJson = function (data) {
  throw new Exception('Method not implemented');
};
