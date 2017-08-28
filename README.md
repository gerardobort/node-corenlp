# NodeJS CoreNLP Library

*This project is under active development, please stay tuned for updates.  More documentation and examples are comming.*


## Setup

This library connects to Stanford CoreNLP either via HTTP or by spawning processes.  The first (HTTP) is the preferred method since it requires CoreNLP to initialize just once to serve many requests, it also avoids extra I/O given that the CLI method need to write temporary files to run.

### 1. Install the package:

```
npm i --save corenlp
```

### 2. Download CoreNLP

http://nlp.stanford.edu/software/stanford-corenlp-full-2017-06-09.zip

### 3.1. Use CoreNLP as HTTP Server

```
# Run the server using all jars in the current directory (e.g., the CoreNLP home directory)
java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -port 9000 -timeout 15000
```

CoreNLP connects by default via StanfordCoreNLPServer, using port 9000.  You can also opt to setup the connection differently:

```
import CoreNLP from 'corenlp';

CoreNLP.setup('English', new CoreNLP.connector.ConnectorServer({ dsn: 'http://localhost:9000' }));
```

### 3.2. Use CoreNLP via CLI

CoreNLP expects by default the StanfordCoreNLP package to be placed (unzipped) inside the path `${YOUR_NPM_PROJECT_ROOT}/corenlp/`.  You can also opt to setup the CLI interface differently:

```
import CoreNLP from 'corenlp';

CoreNLP.setup('English', new CoreNLP.connector.ConnectorCli({
  // specify the paths relative to your project root
  classPath: 'corenlp/stanford-corenlp-full-2017-06-09/*',
  mainClass: 'edu.stanford.nlp.pipeline.StanfordCoreNLP',
  props: 'StanfordCoreNLP-spanish.properties',
}));
```

## Examples

NOTE: The examples below assumes that StanfordCoreNLP is running on port `9000`.

### English

```javascript
import CoreNLP from 'corenlp';

CoreNLP.setup('English');
const sent = new CoreNLP.simple.Sentence('The little dog runs so fast.');
sent.applyAnnotator(CoreNLP.simple.annotator.ParserAnnotator)
  .then(() => {
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  })
  .catch(err => {
    console.log('err', err);
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
  })
  .catch(err => {
    console.log('err', err);
  });
```

## Documentation

We will update this section soon.  In the meantime, you can browse the project codebase and read the @jsdoc referenecs.
In summary, this NodeJS library aims to replicate the CoreNLP Simple Java interface but in Javascript.  There are some minor differences however, for example the need to call `applyAnnotator` asynchronously.

```
CoreNLP
  connector
    ConnectorServer # https://stanfordnlp.github.io/CoreNLP/corenlp-server.html
    ConnectorCli # https://stanfordnlp.github.io/CoreNLP/cmdline.html
  simple # https://stanfordnlp.github.io/CoreNLP/simple.html
    Annotable
    Annotator
    Document
    Sentence
    Token
    annotator # https://stanfordnlp.github.io/CoreNLP/annotators.html
      TokenizerAnnotator # https://stanfordnlp.github.io/CoreNLP/tokenize.html
      WordsToSentenceAnnotator # https://stanfordnlp.github.io/CoreNLP/ssplit.html
      POSTaggerAnnotator # https://stanfordnlp.github.io/CoreNLP/pos.html
      MorphaAnnotator # https://stanfordnlp.github.io/CoreNLP/lemma.html
      NERClassifierCombiner # https://stanfordnlp.github.io/CoreNLP/ner.html
      ParserAnnotator # https://stanfordnlp.github.io/CoreNLP/parse.html
      DependencyParseAnnotator # https://stanfordnlp.github.io/CoreNLP/depparse.html
      RelationExtractorAnnotator # https://stanfordnlp.github.io/CoreNLP/relation.html
      DeterministicCorefAnnotator # https://stanfordnlp.github.io/CoreNLP/coref.html
  util
    Tree # http://www.cs.cornell.edu/courses/cs474/2004fa/lec1.pdf
```

## Stanford CoreNLP Reference

https://github.com/stanfordnlp/CoreNLP

Manning, Christopher D., Mihai Surdeanu, John Bauer, Jenny Finkel, Steven J. Bethard, and David McClosky. 2014. The Stanford CoreNLP Natural Language Processing Toolkit In Proceedings of the 52nd Annual Meeting of the Association for Computational Linguistics: System Demonstrations, pp. 55-60.
