import _ from 'lodash';
import Service from './service';

export default class Annotable {
  constructor(text) {
    this._text = text;
    this._annotators = [];
  }

  // annotator should turn annotator, and let a single apply add all the dependencies at once
  addAnnotator(feat) {
    this._annotators = _.uniq(this._annotators.concat([feat]));
  }

  addAnnotators(feats) {
    this._annotators = _.uniq(this._annotators.concat(feats));
  }

  removeAnnotator(feat) {
    this._annotators = _.difference(this._annotators, [feat]);
  }

  hasAnnotator(annotator) {
    return !~this._annotators.indexOf(annotator);
  }

  hasAnyAnnotator(annotators) {
    return _.intersection(this._annotators, annotators) > 0;
  }

  async applySsplit() {
    this.fromJson(await Service.ssplit(this._text));
    this.addAnnotators(Service.getAnnotatorsAppliedByAnnotator('ssplit'));
  }

  async applyLemma() {
    this.fromJson(await Service.lemma(this._text));
    this.addAnnotators(Service.getAnnotatorsAppliedByAnnotator('lemma'));
  }

  async applyNER() {
    this.fromJson(await Service.ner(this._text));
    this.addAnnotators(Service.getAnnotatorsAppliedByAnnotator('ner'));
  }

  async applyParse() {
    this.fromJson(await Service.parse(this._text));
    this.addAnnotators(Service.getAnnotatorsAppliedByAnnotator('parse'));
  }

  async applyDepParse() {
    this.fromJson(await Service.depparse(this._text));
    this.addAnnotators(Service.getAnnotatorsAppliedByAnnotator('depparse'));
  }

  async applyRelation() {
    this.fromJson(await Service.relation(this._text));
    this.addAnnotators(Service.getAnnotatorsAppliedByAnnotator('relation'));
  }
}
