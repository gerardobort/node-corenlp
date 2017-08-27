# NodeJS CoreNLP Library

This project is under active development, please stay tuned for updates.  More documentation and examples are comming.

## Setup

```
npm i --save corenlp
```

Take a look at package.json scripts for downloading and setting up either a ConnectorServer ot ConnectorCli accordingly.

## Examples

### English

```javascript
import CoreNLP from 'corenlp';

CoreNLP.setup('English');
const sent = new CoreNLP.simple.Sentence('The little dog runs so fast.');
sent.applyAnnotator(CoreNLP.simple.annotator.ParserAnnotator)
  .then(() => {
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  });
```

### Spanish

```javascript
import CoreNLP from 'corenlp';

CoreNLP.setup('Spanish');
const sent = new CoreNLP.simple.Sentence('El pájaro veloz come kiwi.');
sent.applyAnnotator(CoreNLP.simple.annotator.ParserAnnotator)
  .then(() => {
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  });
```

## CoreNLP Reference

https://github.com/stanfordnlp/CoreNLP

Manning, Christopher D., Mihai Surdeanu, John Bauer, Jenny Finkel, Steven J. Bethard, and David McClosky. 2014. The Stanford CoreNLP Natural Language Processing Toolkit In Proceedings of the 52nd Annual Meeting of the Association for Computational Linguistics: System Demonstrations, pp. 55-60.

### Simple

https://stanfordnlp.github.io/CoreNLP/simple.html

### Annotators

https://stanfordnlp.github.io/CoreNLP/annotators.html

