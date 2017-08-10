import Annotation from './annotation';
import Sentence from './sentence';

export default class SentencesAnnotation extends Annotation {
}

/**
 * @typedef SentencesAnnotation
 * @property {Array.<Sentence>} sentences
 */
SentencesAnnotation.fromJson = function (data) {
  const instance = new this();
  instance._sentences = data.sentences.map(sent => Sentence.fromJson(sent));
  return instance;
};
