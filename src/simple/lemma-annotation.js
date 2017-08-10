import Annotation from './annotation';
import Sentence from './sentence';

export default class LemmaAnnotation extends Annotation {
}

/**
 * @typedef LemmaAnnotation
 * @property {Array.<Sentence>} sentences
 */
LemmaAnnotation.fromJson = function (data) {
  const instance = new this();
  instance._sentences = data.sentences.map(sent => Sentence.fromJson(sent));
  return instance;
};
