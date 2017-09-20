## Proposal

The following is a draft of a simpler interface that allows customizing annotators based on pipeline configuration rather than isolated annotator instances:

```javascript
const props = new CoreNLP.Properties();
props.put('annotators', 'tokenize, ssplit, pos, lemma, ner, regexner');
// CoreNLP.File will map the file correclty so the Connector runs smoothly
props.put('regexner.mapping', new CoreNLP.File('./resources/regexner.txt'));
const pipeline = new StanfordCoreNLP(props);
```
