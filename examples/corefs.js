// NOTE: run with babel-node
import path from 'path';
import CoreNLP, { Properties, Pipeline, ConnectorServer } from '../src';

const props = new Properties();
props.setProperty('annotators', 'tokenize,ssplit,coref');
const doc = new CoreNLP.simple.Document(`
  George is a good person. He is really smart. I heard he is also a great son.
  Lisa is instead a sad girl, I never saw her happy.
`);
const pipeline = new Pipeline(props, 'English');

pipeline.annotate(doc)
  .then(doc => {
    const corefChains = doc.corefs();
    corefChains.forEach(chain => {
      console.log('representative ->', chain.representative().token().word());
      chain.nonRepresentatives().forEach(mention => {
        console.log(' ref ->', mention.token().word(), mention.gender(), mention.number());
      });
    });
  })
  .catch(err => {
    console.log('err', err);
  });

/*
OUTPUT:
representative -> George
 ref -> He MALE SINGULAR
 ref -> he MALE SINGULAR
representative -> Lisa
 ref -> her FEMALE SINGULAR
representative -> I
 ref -> I UNKNOWN SINGULAR
*/
