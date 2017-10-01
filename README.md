# NodeJS CoreNLP Library

[![Build Status](https://travis-ci.org/gerardobort/node-corenlp.svg?branch=master)](https://travis-ci.org/gerardobort/node-corenlp)

*This project is under active development, please stay tuned for updates.  More documentation and examples are comming.*

This library connects to Stanford CoreNLP either via HTTP or by spawning processes.  The first (HTTP) is the preferred method since it requires CoreNLP to initialize just once to serve many requests, it also avoids extra I/O given that the CLI method need to write temporary files to run.

## Setup

### 1. Install the package:

```bash
npm i --save corenlp
```

### 2. Download Stanford CoreNLP

Via `npm`, run this command from your own project after having installed this library:

```bash
npm explore corenlp -- npm run corenlp:download
```

Once downloaded you can easily start the server by running

```bash
npm explore corenlp -- npm run corenlp:server
```

Or you can manually download the project from the Stanford's CoreNLP download section at: https://stanfordnlp.github.io/CoreNLP/download.html
You may want to download, apart of the full package, other language models (see more on that page).


### 3. Configure Stanford CoreNLP

#### 3.1. Using StanfordCoreNLPServer

```bash
# Run the server using all jars in the current directory (e.g., the CoreNLP home directory)
java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -port 9000 -timeout 15000
```

CoreNLP connects by default via StanfordCoreNLPServer, using port 9000.  You can also opt to setup the connection differently:

```javascript
import CoreNLP, { Properties, Pipeline, ConnectorServer } from 'corenlp';

const connector = new ConnectorServer({ dsn: 'http://localhost:9000' });
const props = new Properties({
  annotators: 'tokenize,ssplit,pos,lemma,ner,parse',
});
const pipeline = new Pipeline(props, 'English', connector);
```

#### 3.2. Use CoreNLP via CLI

CoreNLP expects by default the StanfordCoreNLP package to be placed (unzipped) inside the path `${YOUR_NPM_PROJECT_ROOT}/corenlp/`.  You can also opt to setup the CLI interface differently:

```javascript
import CoreNLP, { Properties, Pipeline, ConnectorCli } from 'corenlp';

const connector = new ConnectorCli({
  classPath: 'corenlp/stanford-corenlp-full-2017-06-09/*', // specify the paths relative to your npm project root
  mainClass: 'edu.stanford.nlp.pipeline.StanfordCoreNLP', // optional
  props: 'StanfordCoreNLP-spanish.properties', // optional
});
const props = new Properties({
  annotators: 'tokenize,ssplit,pos,lemma,ner,parse',
});
const pipeline = new Pipeline(props, 'English', connector);
```

### 4. Usage

```javascript
// ... initialize pipeline first (see above)

const sent = new CoreNLP.simple.Sentence('Hello world');
pipeline.annotate(sent)
  .then(sent => {
    console.log(sent.words());
  })
  .catch(err => {
    console.log('err', err);
  });
```

## Examples

NOTE1: The examples below assumes that StanfordCoreNLP is running on port `9000`.
NOTE2: The examples below assumes `es6` syntax, if you use require, use as follows: `var CoreNLP = require('corenlp').default;`

### English

```javascript
import CoreNLP, { Properties, Pipeline } from 'corenlp';

const props = new Properties({
  annotators: 'tokenize,ssplit,pos,lemma,ner,parse',
});
const pipeline = new Pipeline(props, 'English'); // uses ConnectorServer by default

const sent = new CoreNLP.simple.Sentence('The little dog runs so fast.');
pipeline.annotate(sent)
  .then(sent => {
    console.log('parse', sent.parse());
    console.log(CoreNLP.util.Tree.fromSentence(sent).dump());
  })
  .catch(err => {
    console.log('err', err);
  });
```

# API Reference
## Functions

<dl>
<dt><a href="#setProperty">setProperty(name, value)</a></dt>
<dd><p>Property setter</p>
</dd>
<dt><a href="#getProperty">getProperty(name, default)</a> ⇒ <code>*</code></dt>
<dd><p>Property getter</p>
</dd>
<dt><a href="#getProperties">getProperties()</a> ⇒ <code>Object</code></dt>
<dd><p>Returns an Object map of the given properties</p>
</dd>
<dt><a href="#toJson">toJson()</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a JSON object of the given properties</p>
</dd>
<dt><a href="#toPropertiessFileContent">toPropertiessFileContent()</a> ⇒ <code>string</code></dt>
<dd><p>Returns a properties file-like string of the given properties</p>
</dd>
<dt><a href="#get">get()</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#get">get(config, [utility])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#text">text()</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representation of the raw text</p>
</dd>
<dt><a href="#setLanguageISO">setLanguageISO()</a> ⇒ <code>string</code></dt>
<dd><p>Sets the language ISO (given by the pipeline during the annotation process)
This is solely to keep track of the language chosen for further analysis</p>
</dd>
<dt><a href="#getLanguageISO">getLanguageISO()</a> ⇒ <code>string</code></dt>
<dd><p>Retrieves the language ISO</p>
</dd>
<dt><a href="#addAnnotator">addAnnotator(annotator)</a></dt>
<dd><p>Marks an annotator as a met dependency</p>
</dd>
<dt><a href="#addAnnotators">addAnnotators(annotators)</a></dt>
<dd><p>Marks multiple annotators as a met dependencies</p>
</dd>
<dt><a href="#removeAnnotator">removeAnnotator(annotator)</a></dt>
<dd><p>Unmarks an annotator as a met dependency</p>
</dd>
<dt><a href="#hasAnnotator">hasAnnotator(annotator)</a> ⇒ <code>boolean</code></dt>
<dd><p>Tells you if an annotator is a met dependency</p>
</dd>
<dt><a href="#hasAnyAnnotator">hasAnyAnnotator(annotators)</a> ⇒ <code>boolean</code></dt>
<dd><p>Tells you if at least on of a list of annotators is a met dependency</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representation</p>
</dd>
<dt><a href="#equalsTo">equalsTo(annotator)</a> ⇒ <code>boolean</code></dt>
<dd><p>Defines whether a given annotator is the same as current, using shallow compare.
This is useful for a Document or Sentence to validate if the minimum of annotators required
were already applied to them.  Allows at the same time the users to instantiate new annotators
and configure them as needed.</p>
</dd>
<dt><a href="#options">options()</a> ⇒ <code>Object</code></dt>
<dd><p>Get an Object key-value representation of the annotor&#39;s options (excluding prefix)</p>
</dd>
<dt><a href="#option">option(key, [value])</a> ⇒ <code>string</code></dt>
<dd><p>Get/Set an option value</p>
</dd>
<dt><a href="#dependencies">dependencies()</a> ⇒ <code>Array.&lt;Annotator&gt;</code></dt>
<dd><p>Get a list of annotators dependencies</p>
</dd>
<dt><a href="#pipeline">pipeline()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Get a list of annotators dependencies, following by this annotator, all this as
a list of strings
This is useful to fulfill the <code>annotators</code> param in CoreNLP API properties.</p>
</dd>
<dt><a href="#pipelineOptions">pipelineOptions()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Get an object of all the Annotator options including the current and all its 
dependencies, prefixed by the annotator names
This is useful to fulfill the options params in CoreNLP API properties.</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representation</p>
</dd>
<dt><a href="#sentences">sentences()</a> ⇒ <code>Array.&lt;Sentence&gt;</code></dt>
<dd><p>Get a list of sentences</p>
</dd>
<dt><a href="#sentence">sentence(index)</a> ⇒ <code>Sentence</code></dt>
<dd><p>Get the sentence for a given index</p>
</dd>
<dt><a href="#coref">coref()</a> ⇒ <code>Promise.&lt;DeterministicCorefAnnotator&gt;</code></dt>
<dd><p>TODO
requirements: tokenize, ssplit, pos, lemma, ner, parse
<a href="https://stanfordnlp.github.io/CoreNLP/dcoref.html">https://stanfordnlp.github.io/CoreNLP/dcoref.html</a></p>
</dd>
<dt><a href="#fromJSON">fromJSON(data)</a> ⇒ <code>Document</code></dt>
<dd><p>Update an instance of Document with data provided by a JSON</p>
</dd>
<dt><a href="#fromJSON">fromJSON(data)</a> ⇒ <code>Document</code></dt>
<dd><p>Get an instance of Document from a given JSON</p>
</dd>
<dt><a href="#groups">groups()</a> ⇒ <code><a href="#ExpressionSentenceMatchGroup">Array.&lt;ExpressionSentenceMatchGroup&gt;</a></code></dt>
<dd><p>Returns the main and labeled groups as a list of ExpressionSentenceMatchGroup</p>
</dd>
<dt><a href="#group">group(label)</a> ⇒ <code><a href="#ExpressionSentenceMatchGroup">ExpressionSentenceMatchGroup</a></code></dt>
<dd><p>Nodes in a Macthed expression can be named, we call them groups here, and
the labels are the name of the nodes.</p>
</dd>
<dt><a href="#labels">labels()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Labels are those aliases you can add to a group match expression, for example,
in Semgrex, you can do {ner:/PERSON/=good_guy}, from where &quot;good_guy&quot; would be the label
and internally it will come as $good_guy as a member of <a href="#ExpressionSentenceMatchGroup">ExpressionSentenceMatchGroup</a>.</p>
</dd>
<dt><a href="#fromJson">fromJson(data)</a> ⇒ <code>ExpressionSentenceMatch</code></dt>
<dd><p>Update an instance of ExpressionSentenceMatch with data provided by a JSON</p>
</dd>
<dt><a href="#fromJson">fromJson(data)</a> ⇒ <code>ExpressionSentenceMatch</code></dt>
<dd><p>Get an instance of ExpressionSentenceMatch from a given JSON</p>
</dd>
<dt><a href="#matches">matches()</a> ⇒ <code>Array.&lt;ExpressionSentenceMatch&gt;</code></dt>
<dd><p>Retrieves all the contained ExpressionSentenceMatch instances</p>
</dd>
<dt><a href="#match">match(index)</a> ⇒ <code>ExpressionSentenceMatch</code></dt>
<dd><p>Retrieves a ExpressionSentenceMatch at the index specified</p>
</dd>
<dt><a href="#mergeTokensFromSentence">mergeTokensFromSentence()</a> ⇒ <code>ExpressionSentence</code></dt>
<dd><p>The Expression / ExpressionSentence objects comes from outside the standard CoreNLP pipelines.
This mean that neither <code>TokensRegex</code>, <code>Semgrex</code> nor <code>Tregex</code> will tag the nodes with POS,
lemma, NER or any otehr annotation data.  This is sometimes a usful resource to count with, if
you can apart of getting the matching groups, get the annotated tokens for each word in the
match group.</p>
</dd>
<dt><a href="#fromJson">fromJson(data)</a> ⇒ <code>ExpressionSentenceJSON</code></dt>
<dd><p>Update an instance of ExpressionSentence with data provided by a JSON</p>
</dd>
<dt><a href="#fromJson">fromJson(data)</a> ⇒ <code>ExpressionSentence</code></dt>
<dd><p>Get an instance of ExpressionSentence from a given JSON of sentence matches</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representation</p>
</dd>
<dt><a href="#pattern">pattern()</a> ⇒ <code>string</code></dt>
<dd><p>Get the pattern</p>
</dd>
<dt><a href="#sentences">sentences()</a> ⇒ <code>Array.&lt;ExpressionSentence&gt;</code></dt>
<dd><p>Get a list of sentences</p>
</dd>
<dt><a href="#sentence">sentence(index)</a> ⇒ <code>ExpressionSentence</code></dt>
<dd><p>Get the sentence for a given index</p>
</dd>
<dt><a href="#mergeTokensFromDocument">mergeTokensFromDocument(document)</a> ⇒ <code>Expression</code></dt>
<dd><p>Hydrate the Expression instance with Token objects from an annotated Document</p>
</dd>
<dt><a href="#fromJson">fromJson(data)</a> ⇒ <code>Expression</code></dt>
<dd><p>Update an instance of Expression with data provided by a JSON</p>
</dd>
<dt><a href="#fromJson">fromJson(data)</a> ⇒ <code>Expression</code></dt>
<dd><p>Get an instance of Expression from a given JSON</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representation</p>
</dd>
<dt><a href="#fromJSON">fromJSON(data)</a> ⇒ <code>Governor</code></dt>
<dd><p>Get an instance of Governor from a given JSON</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representation</p>
</dd>
<dt><a href="#index">index()</a> ⇒ <code>number</code></dt>
<dd><p>Get the index relative to the parent document</p>
</dd>
<dt><a href="#parse">parse()</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representation of the parse tree structure</p>
</dd>
<dt><a href="#words">words()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Get an array of string representations of the sentence words</p>
</dd>
<dt><a href="#word">word(index)</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representations of the Nth word of the sentence</p>
</dd>
<dt><a href="#posTags">posTags()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Get a string representations of the tokens part of speech of the sentence</p>
</dd>
<dt><a href="#posTag">posTag(index)</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representations of the Nth token part of speech of the sentence</p>
</dd>
<dt><a href="#lemmas">lemmas()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Get a string representations of the tokens lemmas of the sentence</p>
</dd>
<dt><a href="#lemma">lemma(index)</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representations of the Nth token lemma of the sentence</p>
</dd>
<dt><a href="#nerTags">nerTags()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Get a string representations of the tokens nerTags of the sentence</p>
</dd>
<dt><a href="#nerTag">nerTag(index)</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representations of the Nth token nerTag of the sentence</p>
</dd>
<dt><a href="#governors">governors()</a> ⇒ <code>Array.&lt;Governor&gt;</code></dt>
<dd><p>Get a list of annotated governors by the dependency-parser</p>
</dd>
<dt><a href="#governor">governor()</a> ⇒ <code>Governor</code></dt>
<dd><p>Get the N-th annotated governor by the dependency-parser annotator</p>
</dd>
<dt><a href="#tokens">tokens()</a> ⇒ <code>Array.&lt;Token&gt;</code></dt>
<dd><p>Get an array of token representations of the sentence words</p>
</dd>
<dt><a href="#token">token()</a> ⇒ <code>Token</code></dt>
<dd><p>Get the Nth token of the sentence</p>
</dd>
<dt><a href="#toJSON">toJSON()</a> ⇒ <code><a href="#SentenceJSON">SentenceJSON</a></code></dt>
<dd><p>The following arrow function <code>data =&gt; Sentence.fromJSON(data).toJSON()</code> is idempontent, if
considering shallow comparison, not by reference.
This JSON will respects the same structure as it expects from {@see Sentence#fromJSON}.</p>
</dd>
<dt><a href="#fromJSON">fromJSON(data, [isSentence])</a> ⇒ <code>Sentence</code></dt>
<dd><p>Update an instance of Sentence with data provided by a JSON</p>
</dd>
<dt><a href="#fromJSON">fromJSON(data, [isSentence])</a> ⇒ <code>Sentence</code></dt>
<dd><p>Get an instance of Sentence from a given JSON</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Get a string representation</p>
</dd>
<dt><a href="#index">index()</a> ⇒ <code>number</code></dt>
<dd><p>Get the <code>inde</code> number associated by the StanfordCoreNLP
This index is relative to the sentence it belongs to, and is a 1-based (possitive integer).
This number is useful to match tokens within a sentence for depparse, coreference, etc.</p>
</dd>
<dt><a href="#word">word()</a> ⇒ <code>string</code></dt>
<dd><p>Get the original word</p>
</dd>
<dt><a href="#originalText">originalText()</a> ⇒ <code>string</code></dt>
<dd><p>Get the original text</p>
</dd>
<dt><a href="#characterOffsetBegin">characterOffsetBegin()</a> ⇒ <code>number</code></dt>
<dd><p>A 0-based index of the word&#39;s initial character within the sentence</p>
</dd>
<dt><a href="#characterOffsetEnd">characterOffsetEnd()</a> ⇒ <code>number</code></dt>
<dd><p>Get the characterOffsetEnd relative to the parent sentence
A 0-based index of the word&#39;s ending character within the sentence</p>
</dd>
<dt><a href="#before">before()</a> ⇒ <code>string</code></dt>
<dd><p>Get the <code>before</code> string relative to the container sentence</p>
</dd>
<dt><a href="#after">after()</a> ⇒ <code>string</code></dt>
<dd><p>Get the <code>after</code> string relative to the container sentence</p>
</dd>
<dt><a href="#lemma">lemma()</a> ⇒ <code>string</code></dt>
<dd><p>Get the annotated lemma</p>
</dd>
<dt><a href="#pos">pos()</a> ⇒ <code>string</code></dt>
<dd><p>Get the annotated part-of-speech for the current token</p>
</dd>
<dt><a href="#posInfo">posInfo()</a> ⇒ <code><a href="#PosInfo">PosInfo</a></code></dt>
<dd><p>Get additional metadata about the POS annotation
NOTE: Do not use this method other than just for study or analysis purposes.</p>
</dd>
<dt><a href="#ner">ner()</a> ⇒ <code>string</code></dt>
<dd><p>Get the annotated named-entity for the current token</p>
</dd>
<dt><a href="#toJSON">toJSON()</a> ⇒ <code><a href="#TokenJSON">TokenJSON</a></code></dt>
<dd><p>The following arrow function <code>data =&gt; Token.fromJSON(data).toJSON()</code> is idempontent, if
considering shallow comparison, not by reference.
This JSON will respects the same structure as it expects from {@see Token#fromJSON}.</p>
</dd>
<dt><a href="#fromJSON">fromJSON(data)</a> ⇒ <code>Token</code></dt>
<dd><p>Get an instance of Token from a given JSON</p>
</dd>
<dt><a href="#dump">dump()</a> ⇒ <code>string</code></dt>
<dd><p>Get a Tree string representation for debugging purposes</p>
</dd>
<dt><a href="#visitDeepFirst">visitDeepFirst()</a></dt>
<dd><p>Performs Deep-first Search calling a visitor for each node</p>
</dd>
<dt><a href="#visitDeepFirstRight">visitDeepFirstRight()</a></dt>
<dd><p>Performs Deep-first Search calling a visitor for each node, from right to left</p>
</dd>
<dt><a href="#visitLeaves">visitLeaves()</a></dt>
<dd><p>Performs Deep-first Search calling a visitor only over leaves</p>
</dd>
<dt><a href="#fromSentence">fromSentence(sentence, [doubleLink])</a> ⇒ <code>Tree</code></dt>
<dd></dd>
<dt><a href="#fromString">fromString(str, [doubleLink])</a> ⇒ <code>Tree</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#DocumentJSON">DocumentJSON</a></dt>
<dd><p>The CoreNLP API JSON structure representing a document</p>
</dd>
<dt><a href="#ExpressionSentenceMatchGroup">ExpressionSentenceMatchGroup</a></dt>
<dd></dd>
<dt><a href="#ExpressionSentenceMatchJSON">ExpressionSentenceMatchJSON</a></dt>
<dd><p>A ExpressionSentenceMatch of either <code>TokensRegex</code>, <code>Semrgex</code> or <code>Tregex</code>.</p>
</dd>
<dt><a href="#ExpressionJSON">ExpressionJSON</a></dt>
<dd><p>The CoreNLP API JSON structure representing an expression
This expression structure can be found as the output of <code>TokensRegex</code>,
<code>Semrgex</code> and <code>Tregex</code>.</p>
</dd>
<dt><a href="#GovernorJSON">GovernorJSON</a></dt>
<dd><p>The CoreNLP API JSON structure representing a governor</p>
</dd>
<dt><a href="#SentenceJSON">SentenceJSON</a></dt>
<dd><p>The CoreNLP API JSON structure representing a sentence</p>
</dd>
<dt><a href="#TokenJSON">TokenJSON</a></dt>
<dd><p>The CoreNLP API JSON structure representing a token</p>
</dd>
<dt><a href="#PosInfo">PosInfo</a></dt>
<dd><p>PosInfo does not come as part of the CoreNLP.  It is an indexed reference of POS tags
by language provided by this library.  It&#39;s only helpful for analysis and study.  The
data was collected from different documentation resources on the Web.
The PosInfo may vary depending on the POS annotation types used, for example, CoreNLP
for Spanish uses custom POS tags developed by Stanford, but this can also be changed 
to Universal Dependencies, which uses different tags.</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#DeterministicCorefAnnotator
TODO ??external_">DeterministicCorefAnnotator
TODO ??</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an DeterministicCorefAnnotator.</p>
</dd>
<dt><a href="#DependencyParseAnnotator
Hydrates {@link Sentence.governors_new}external_">DependencyParseAnnotator
Hydrates {@link Sentence.governors()}</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an DependencyParseAnnotator.</p>
</dd>
<dt><a href="#MorphaAnnotator
Hydrates {@link Token.lemma_new}external_">MorphaAnnotator
Hydrates {@link Token.lemma()}</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an MorphaAnnotator.</p>
</dd>
<dt><a href="#NERClassifierCombiner
Hydrates {@link Token.ner_new}external_">NERClassifierCombiner
Hydrates {@link Token.ner()}</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an NERClassifierCombiner.</p>
</dd>
<dt><a href="#ParserAnnotator
Hydrates {@link Token.parse_new}external_">ParserAnnotator
Hydrates {@link Token.parse()}</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an ParserAnnotator.</p>
</dd>
<dt><a href="#POSTaggerAnnotator
Hydrates {@link Token.pos_new}external_">POSTaggerAnnotator
Hydrates {@link Token.pos()}</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an POSTaggerAnnotator.</p>
</dd>
<dt><a href="#RegexNERAnnotator
TODO ??external_">RegexNERAnnotator
TODO ??</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an RegexNERAnnotator.</p>
</dd>
<dt><a href="#RelationExtractorAnnotator
TODO ??external_">RelationExtractorAnnotator
TODO ??</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an RelationExtractorAnnotator.</p>
</dd>
<dt><a href="#WordsToSentenceAnnotator
Combines multiple {@link Token}s into sentencesexternal_">WordsToSentenceAnnotator
Combines multiple {@link Token}s into sentences</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an WordsToSentenceAnnotator.</p>
</dd>
<dt><a href="#TokenizerAnnotator
Identifies {@link Token}sexternal_">TokenizerAnnotator
Identifies {@link Token}s</a> ⇐ <code>Annotator</code></dt>
<dd><p>Class representing an TokenizerAnnotator.</p>
</dd>
</dl>

<a name="setProperty"></a>

## setProperty(name, value)
Property setter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the property name |
| value | <code>\*</code> | the property value |

<a name="getProperty"></a>

## getProperty(name, default) ⇒ <code>\*</code>
Property getter

**Kind**: global function  
**Returns**: <code>\*</code> - value - the property value  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the property name |
| default | <code>\*</code> | the defaut value to return if not set |

<a name="getProperties"></a>

## getProperties() ⇒ <code>Object</code>
Returns an Object map of the given properties

**Kind**: global function  
**Returns**: <code>Object</code> - properties - the properties object  
<a name="toJson"></a>

## toJson() ⇒ <code>Object</code>
Returns a JSON object of the given properties

**Kind**: global function  
**Returns**: <code>Object</code> - json - the properties object  
<a name="toPropertiessFileContent"></a>

## toPropertiessFileContent() ⇒ <code>string</code>
Returns a properties file-like string of the given properties

**Kind**: global function  
**Returns**: <code>string</code> - properties - the properties content  
<a name="get"></a>

## get() ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function  
<a name="get"></a>

## get(config, [utility]) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> |  |
| config.annotators | <code>Array.&lt;string&gt;</code> | The list of annotators that edfines the pipeline |
| config.text | <code>string</code> | The text to run the pipeline against |
| config.options | <code>Object</code> | Additinal options (properties) for the pipeline |
| config.language | <code>string</code> | Language full name in CamelCase (eg. Spanish) |
| [utility] | <code>&#x27;&#x27;</code> &#124; <code>&#x27;tokensregex&#x27;</code> &#124; <code>&#x27;semgrex&#x27;</code> &#124; <code>&#x27;tregex&#x27;</code> | Name of the utility to use NOTE: most of the utilities receives properties, these should be passed via the options param |

<a name="text"></a>

## text() ⇒ <code>string</code>
Get a string representation of the raw text

**Kind**: global function  
**Returns**: <code>string</code> - text  
<a name="setLanguageISO"></a>

## setLanguageISO() ⇒ <code>string</code>
Sets the language ISO (given by the pipeline during the annotation process)
This is solely to keep track of the language chosen for further analysis

**Kind**: global function  
**Returns**: <code>string</code> - text  
<a name="getLanguageISO"></a>

## getLanguageISO() ⇒ <code>string</code>
Retrieves the language ISO

**Kind**: global function  
**Returns**: <code>string</code> - text  
<a name="addAnnotator"></a>

## addAnnotator(annotator)
Marks an annotator as a met dependency

**Kind**: global function  

| Param | Type |
| --- | --- |
| annotator | <code>Annotator</code> &#124; <code>function</code> | 

<a name="addAnnotators"></a>

## addAnnotators(annotators)
Marks multiple annotators as a met dependencies

**Kind**: global function  

| Param | Type |
| --- | --- |
| annotators | <code>Array.&lt;(Annotator\|function())&gt;</code> | 

<a name="removeAnnotator"></a>

## removeAnnotator(annotator)
Unmarks an annotator as a met dependency

**Kind**: global function  

| Param | Type |
| --- | --- |
| annotator | <code>Annotator</code> &#124; <code>function</code> | 

<a name="hasAnnotator"></a>

## hasAnnotator(annotator) ⇒ <code>boolean</code>
Tells you if an annotator is a met dependency

**Kind**: global function  
**Returns**: <code>boolean</code> - hasAnnotator  

| Param | Type |
| --- | --- |
| annotator | <code>Annotator</code> &#124; <code>function</code> | 

<a name="hasAnyAnnotator"></a>

## hasAnyAnnotator(annotators) ⇒ <code>boolean</code>
Tells you if at least on of a list of annotators is a met dependency

**Kind**: global function  
**Returns**: <code>boolean</code> - hasAnyAnnotator  

| Param | Type |
| --- | --- |
| annotators | <code>Array.&lt;(Annotator\|function())&gt;</code> | 

<a name="toString"></a>

## toString() ⇒ <code>string</code>
Get a string representation

**Kind**: global function  
**Returns**: <code>string</code> - annotator  
<a name="equalsTo"></a>

## equalsTo(annotator) ⇒ <code>boolean</code>
Defines whether a given annotator is the same as current, using shallow compare.
This is useful for a Document or Sentence to validate if the minimum of annotators required
were already applied to them.  Allows at the same time the users to instantiate new annotators
and configure them as needed.

**Kind**: global function  

| Param | Type |
| --- | --- |
| annotator | <code>Annotator</code> | 

<a name="options"></a>

## options() ⇒ <code>Object</code>
Get an Object key-value representation of the annotor's options (excluding prefix)

**Kind**: global function  
**Returns**: <code>Object</code> - options  
<a name="option"></a>

## option(key, [value]) ⇒ <code>string</code>
Get/Set an option value

**Kind**: global function  
**Returns**: <code>string</code> - value  

| Param | Type | Default |
| --- | --- | --- |
| key | <code>string</code> |  | 
| [value] | <code>string</code> &#124; <code>boolean</code> | <code>null</code> | 

<a name="dependencies"></a>

## dependencies() ⇒ <code>Array.&lt;Annotator&gt;</code>
Get a list of annotators dependencies

**Kind**: global function  
**Returns**: <code>Array.&lt;Annotator&gt;</code> - dependencies  
<a name="pipeline"></a>

## pipeline() ⇒ <code>Array.&lt;string&gt;</code>
Get a list of annotators dependencies, following by this annotator, all this as
a list of strings
This is useful to fulfill the `annotators` param in CoreNLP API properties.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - pipeline  
<a name="pipelineOptions"></a>

## pipelineOptions() ⇒ <code>Array.&lt;string&gt;</code>
Get an object of all the Annotator options including the current and all its 
dependencies, prefixed by the annotator names
This is useful to fulfill the options params in CoreNLP API properties.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - pipelineOptions  
<a name="toString"></a>

## toString() ⇒ <code>string</code>
Get a string representation

**Kind**: global function  
**Returns**: <code>string</code> - document  
<a name="sentences"></a>

## sentences() ⇒ <code>Array.&lt;Sentence&gt;</code>
Get a list of sentences

**Kind**: global function  
**Returns**: <code>Array.&lt;Sentence&gt;</code> - sentences - The document sentences  
<a name="sentence"></a>

## sentence(index) ⇒ <code>Sentence</code>
Get the sentence for a given index

**Kind**: global function  
**Returns**: <code>Sentence</code> - sentence - The document sentences  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The position of the sentence to get |

<a name="coref"></a>

## coref() ⇒ <code>Promise.&lt;DeterministicCorefAnnotator&gt;</code>
TODO
requirements: tokenize, ssplit, pos, lemma, ner, parse
https://stanfordnlp.github.io/CoreNLP/dcoref.html

**Kind**: global function  
**Returns**: <code>Promise.&lt;DeterministicCorefAnnotator&gt;</code> - dcoref  
<a name="fromJSON"></a>

## fromJSON(data) ⇒ <code>Document</code>
Update an instance of Document with data provided by a JSON

**Kind**: global function  
**Returns**: <code>Document</code> - document - The current document instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>[DocumentJSON](#DocumentJSON)</code> | The document data, as returned by CoreNLP API service |

<a name="fromJSON"></a>

## fromJSON(data) ⇒ <code>Document</code>
Get an instance of Document from a given JSON

**Kind**: global function  
**Returns**: <code>Document</code> - document - A new Document instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>[DocumentJSON](#DocumentJSON)</code> | The document data, as returned by CoreNLP API service |

<a name="groups"></a>

## groups() ⇒ <code>[Array.&lt;ExpressionSentenceMatchGroup&gt;](#ExpressionSentenceMatchGroup)</code>
Returns the main and labeled groups as a list of ExpressionSentenceMatchGroup

**Kind**: global function  
**Returns**: <code>[Array.&lt;ExpressionSentenceMatchGroup&gt;](#ExpressionSentenceMatchGroup)</code> - groups  
<a name="group"></a>

## group(label) ⇒ <code>[ExpressionSentenceMatchGroup](#ExpressionSentenceMatchGroup)</code>
Nodes in a Macthed expression can be named, we call them groups here, and
the labels are the name of the nodes.

**Kind**: global function  
**Returns**: <code>[ExpressionSentenceMatchGroup](#ExpressionSentenceMatchGroup)</code> - group  
**See**: [https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexPattern.html#Naming_nodes](https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexPattern.html#Naming_nodes)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The label name, not prefixed wih $ |

<a name="labels"></a>

## labels() ⇒ <code>Array.&lt;string&gt;</code>
Labels are those aliases you can add to a group match expression, for example,
in Semgrex, you can do {ner:/PERSON/=good_guy}, from where "good_guy" would be the label
and internally it will come as $good_guy as a member of [ExpressionSentenceMatchGroup](#ExpressionSentenceMatchGroup).

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - labels  
<a name="fromJson"></a>

## fromJson(data) ⇒ <code>ExpressionSentenceMatch</code>
Update an instance of ExpressionSentenceMatch with data provided by a JSON

**Kind**: global function  
**Returns**: <code>ExpressionSentenceMatch</code> - expression - The current match instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>[ExpressionSentenceMatchJSON](#ExpressionSentenceMatchJSON)</code> | The match data, as returned by CoreNLP API service |

<a name="fromJson"></a>

## fromJson(data) ⇒ <code>ExpressionSentenceMatch</code>
Get an instance of ExpressionSentenceMatch from a given JSON

**Kind**: global function  
**Returns**: <code>ExpressionSentenceMatch</code> - match - A new ExpressionSentenceMatch instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>[ExpressionSentenceMatchJSON](#ExpressionSentenceMatchJSON)</code> | The match data, as returned by CoreNLP API service |

<a name="matches"></a>

## matches() ⇒ <code>Array.&lt;ExpressionSentenceMatch&gt;</code>
Retrieves all the contained ExpressionSentenceMatch instances

**Kind**: global function  
**Returns**: <code>Array.&lt;ExpressionSentenceMatch&gt;</code> - matches  
<a name="match"></a>

## match(index) ⇒ <code>ExpressionSentenceMatch</code>
Retrieves a ExpressionSentenceMatch at the index specified

**Kind**: global function  
**Returns**: <code>ExpressionSentenceMatch</code> - match  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 

<a name="mergeTokensFromSentence"></a>

## mergeTokensFromSentence() ⇒ <code>ExpressionSentence</code>
The Expression / ExpressionSentence objects comes from outside the standard CoreNLP pipelines.
This mean that neither `TokensRegex`, `Semgrex` nor `Tregex` will tag the nodes with POS,
lemma, NER or any otehr annotation data.  This is sometimes a usful resource to count with, if
you can apart of getting the matching groups, get the annotated tokens for each word in the
match group.

**Kind**: global function  
**Returns**: <code>ExpressionSentence</code> - instance = The current instance  
<a name="fromJson"></a>

## fromJson(data) ⇒ <code>ExpressionSentenceJSON</code>
Update an instance of ExpressionSentence with data provided by a JSON

**Kind**: global function  
**Returns**: <code>ExpressionSentenceJSON</code> - sentence - The current sentence instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>ExpressionSentenceJSON</code> | The expression data, as returned by CoreNLP API service |

<a name="fromJson"></a>

## fromJson(data) ⇒ <code>ExpressionSentence</code>
Get an instance of ExpressionSentence from a given JSON of sentence matches

**Kind**: global function  
**Returns**: <code>ExpressionSentence</code> - sentence - A new ExpressionSentence instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>ExpressionSentenceJSON</code> | The sentence data, as returned by CoreNLP API service |

<a name="toString"></a>

## toString() ⇒ <code>string</code>
Get a string representation

**Kind**: global function  
**Returns**: <code>string</code> - expression  
<a name="pattern"></a>

## pattern() ⇒ <code>string</code>
Get the pattern

**Kind**: global function  
**Returns**: <code>string</code> - pattern - The expression pattern  
<a name="sentences"></a>

## sentences() ⇒ <code>Array.&lt;ExpressionSentence&gt;</code>
Get a list of sentences

**Kind**: global function  
**Returns**: <code>Array.&lt;ExpressionSentence&gt;</code> - sentences - The expression sentences  
<a name="sentence"></a>

## sentence(index) ⇒ <code>ExpressionSentence</code>
Get the sentence for a given index

**Kind**: global function  
**Returns**: <code>ExpressionSentence</code> - sentence - An expression sentence  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The position of the sentence to get |

<a name="mergeTokensFromDocument"></a>

## mergeTokensFromDocument(document) ⇒ <code>Expression</code>
Hydrate the Expression instance with Token objects from an annotated Document

**Kind**: global function  
**Returns**: <code>Expression</code> - expression - The current expression instance  
**See**: [ExpressionSentence#mergeTokensFromSentence](ExpressionSentence#mergeTokensFromSentence)  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>Document</code> | An annotated document from where to extract the tokens |

<a name="fromJson"></a>

## fromJson(data) ⇒ <code>Expression</code>
Update an instance of Expression with data provided by a JSON

**Kind**: global function  
**Returns**: <code>Expression</code> - expression - The current expression instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>[ExpressionJSON](#ExpressionJSON)</code> | The expression data, as returned by CoreNLP API service |

<a name="fromJson"></a>

## fromJson(data) ⇒ <code>Expression</code>
Get an instance of Expression from a given JSON

**Kind**: global function  
**Returns**: <code>Expression</code> - expression - A new Expression instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>[ExpressionJSON](#ExpressionJSON)</code> | The expression data, as returned by CoreNLP API service |

<a name="toString"></a>

## toString() ⇒ <code>string</code>
Get a string representation

**Kind**: global function  
**Returns**: <code>string</code> - governor  
<a name="fromJSON"></a>

## fromJSON(data) ⇒ <code>Governor</code>
Get an instance of Governor from a given JSON

**Kind**: global function  
**Returns**: <code>Governor</code> - governor - A new Governor instance  
**Todo**

- [ ] It is not possible to properly generate a Governor from a GovernorJSON
      the Governor requires references to the Token instances in order to work


| Param | Type | Description |
| --- | --- | --- |
| data | <code>[GovernorJSON](#GovernorJSON)</code> | The token data, as returned by CoreNLP API service |

<a name="toString"></a>

## toString() ⇒ <code>string</code>
Get a string representation

**Kind**: global function  
**Returns**: <code>string</code> - sentence  
<a name="index"></a>

## index() ⇒ <code>number</code>
Get the index relative to the parent document

**Kind**: global function  
**Returns**: <code>number</code> - index  
<a name="parse"></a>

## parse() ⇒ <code>string</code>
Get a string representation of the parse tree structure

**Kind**: global function  
**Returns**: <code>string</code> - parse  
<a name="words"></a>

## words() ⇒ <code>Array.&lt;string&gt;</code>
Get an array of string representations of the sentence words

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - words  
**Throws**:

- <code>Error</code> in case the require annotator was not applied to the sentence

**Requires**: <code>{@link TokenizerAnnotator}</code>  
<a name="word"></a>

## word(index) ⇒ <code>string</code>
Get a string representations of the Nth word of the sentence

**Kind**: global function  
**Returns**: <code>string</code> - word  
**Throws**:

- <code>Error</code> in case the require annotator was not applied to the sentence
- <code>Error</code> in case the token for the given index does not exists

**Requires**: <code>{@link TokenizerAnnotator}</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | 0-based index as they are arranged naturally |

<a name="posTags"></a>

## posTags() ⇒ <code>Array.&lt;string&gt;</code>
Get a string representations of the tokens part of speech of the sentence

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - posTags  
<a name="posTag"></a>

## posTag(index) ⇒ <code>string</code>
Get a string representations of the Nth token part of speech of the sentence

**Kind**: global function  
**Returns**: <code>string</code> - posTag  
**Throws**:

- <code>Error</code> in case the token for the given index does not exists


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | 0-based index as they are arranged naturally |

<a name="lemmas"></a>

## lemmas() ⇒ <code>Array.&lt;string&gt;</code>
Get a string representations of the tokens lemmas of the sentence

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - lemmas  
<a name="lemma"></a>

## lemma(index) ⇒ <code>string</code>
Get a string representations of the Nth token lemma of the sentence

**Kind**: global function  
**Returns**: <code>string</code> - lemma  
**Throws**:

- <code>Error</code> in case the token for the given index does not exists


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | 0-based index as they are arranged naturally |

<a name="nerTags"></a>

## nerTags() ⇒ <code>Array.&lt;string&gt;</code>
Get a string representations of the tokens nerTags of the sentence

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - nerTags  
<a name="nerTag"></a>

## nerTag(index) ⇒ <code>string</code>
Get a string representations of the Nth token nerTag of the sentence

**Kind**: global function  
**Returns**: <code>string</code> - nerTag  
**Throws**:

- <code>Error</code> in case the token for the given index does not exists


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | 0-based index as they are arranged naturally |

<a name="governors"></a>

## governors() ⇒ <code>Array.&lt;Governor&gt;</code>
Get a list of annotated governors by the dependency-parser

**Kind**: global function  
**Returns**: <code>Array.&lt;Governor&gt;</code> - governors  
**Throws**:

- <code>Error</code> in case the require annotator was not applied to the sentence

**Requires**: <code>{@link DependencyParseAnnotator}</code>  
<a name="governor"></a>

## governor() ⇒ <code>Governor</code>
Get the N-th annotated governor by the dependency-parser annotator

**Kind**: global function  
**Returns**: <code>Governor</code> - governor  
**Throws**:

- <code>Error</code> in case the require annotator was not applied to the sentence

**Requires**: <code>{@link DependencyParseAnnotator}</code>  
<a name="tokens"></a>

## tokens() ⇒ <code>Array.&lt;Token&gt;</code>
Get an array of token representations of the sentence words

**Kind**: global function  
**Returns**: <code>Array.&lt;Token&gt;</code> - tokens  
**Throws**:

- <code>Error</code> in case the require annotator was not applied to the sentence

**Requires**: <code>{@link TokenizerAnnotator}</code>  
<a name="token"></a>

## token() ⇒ <code>Token</code>
Get the Nth token of the sentence

**Kind**: global function  
**Returns**: <code>Token</code> - token  
**Throws**:

- <code>Error</code> in case the require annotator was not applied to the sentence

**Requires**: <code>{@link TokenizerAnnotator}</code>  
<a name="toJSON"></a>

## toJSON() ⇒ <code>[SentenceJSON](#SentenceJSON)</code>
The following arrow function `data => Sentence.fromJSON(data).toJSON()` is idempontent, if
considering shallow comparison, not by reference.
This JSON will respects the same structure as it expects from {@see Sentence#fromJSON}.

**Kind**: global function  
**Returns**: <code>[SentenceJSON](#SentenceJSON)</code> - data  
<a name="fromJSON"></a>

## fromJSON(data, [isSentence]) ⇒ <code>Sentence</code>
Update an instance of Sentence with data provided by a JSON

**Kind**: global function  
**Returns**: <code>Sentence</code> - sentence - The current sentence instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>[SentenceJSON](#SentenceJSON)</code> |  | The document data, as returned by CoreNLP API service |
| [isSentence] | <code>boolean</code> | <code>false</code> | Indicate if the given data represents just the sentence or a full document with just a sentence inside |

<a name="fromJSON"></a>

## fromJSON(data, [isSentence]) ⇒ <code>Sentence</code>
Get an instance of Sentence from a given JSON

**Kind**: global function  
**Returns**: <code>Sentence</code> - document - A new Sentence instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>[SentenceJSON](#SentenceJSON)</code> |  | The document data, as returned by CoreNLP API service |
| [isSentence] | <code>boolean</code> | <code>false</code> | Indicate if the given data represents just the sentence of a full document |

<a name="toString"></a>

## toString() ⇒ <code>string</code>
Get a string representation

**Kind**: global function  
**Returns**: <code>string</code> - token  
<a name="index"></a>

## index() ⇒ <code>number</code>
Get the `inde ` number associated by the StanfordCoreNLP
This index is relative to the sentence it belongs to, and is a 1-based (possitive integer).
This number is useful to match tokens within a sentence for depparse, coreference, etc.

**Kind**: global function  
**Returns**: <code>number</code> - index  
<a name="word"></a>

## word() ⇒ <code>string</code>
Get the original word

**Kind**: global function  
**Returns**: <code>string</code> - word  
<a name="originalText"></a>

## originalText() ⇒ <code>string</code>
Get the original text

**Kind**: global function  
**Returns**: <code>string</code> - originalText  
<a name="characterOffsetBegin"></a>

## characterOffsetBegin() ⇒ <code>number</code>
A 0-based index of the word's initial character within the sentence

**Kind**: global function  
**Returns**: <code>number</code> - characterOffsetBegin  
<a name="characterOffsetEnd"></a>

## characterOffsetEnd() ⇒ <code>number</code>
Get the characterOffsetEnd relative to the parent sentence
A 0-based index of the word's ending character within the sentence

**Kind**: global function  
**Returns**: <code>number</code> - characterOffsetEnd  
<a name="before"></a>

## before() ⇒ <code>string</code>
Get the `before` string relative to the container sentence

**Kind**: global function  
**Returns**: <code>string</code> - before  
<a name="after"></a>

## after() ⇒ <code>string</code>
Get the `after` string relative to the container sentence

**Kind**: global function  
**Returns**: <code>string</code> - after  
<a name="lemma"></a>

## lemma() ⇒ <code>string</code>
Get the annotated lemma

**Kind**: global function  
**Returns**: <code>string</code> - lemma  
<a name="pos"></a>

## pos() ⇒ <code>string</code>
Get the annotated part-of-speech for the current token

**Kind**: global function  
**Returns**: <code>string</code> - pos  
<a name="posInfo"></a>

## posInfo() ⇒ <code>[PosInfo](#PosInfo)</code>
Get additional metadata about the POS annotation
NOTE: Do not use this method other than just for study or analysis purposes.

**Kind**: global function  
**Returns**: <code>[PosInfo](#PosInfo)</code> - posInfo  
**See**: [PosInfo](#PosInfo) for more details  
<a name="ner"></a>

## ner() ⇒ <code>string</code>
Get the annotated named-entity for the current token

**Kind**: global function  
**Returns**: <code>string</code> - ner  
<a name="toJSON"></a>

## toJSON() ⇒ <code>[TokenJSON](#TokenJSON)</code>
The following arrow function `data => Token.fromJSON(data).toJSON()` is idempontent, if
considering shallow comparison, not by reference.
This JSON will respects the same structure as it expects from {@see Token#fromJSON}.

**Kind**: global function  
**Returns**: <code>[TokenJSON](#TokenJSON)</code> - data  
<a name="fromJSON"></a>

## fromJSON(data) ⇒ <code>Token</code>
Get an instance of Token from a given JSON

**Kind**: global function  
**Returns**: <code>Token</code> - token - A new Token instance  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>[TokenJSON](#TokenJSON)</code> | The token data, as returned by CoreNLP API service |

<a name="dump"></a>

## dump() ⇒ <code>string</code>
Get a Tree string representation for debugging purposes

**Kind**: global function  
**Returns**: <code>string</code> - tree  
<a name="visitDeepFirst"></a>

## visitDeepFirst()
Performs Deep-first Search calling a visitor for each node

**Kind**: global function  
**See**: [DFS](https://en.wikipedia.org/wiki/Depth-first_search)  
<a name="visitDeepFirstRight"></a>

## visitDeepFirstRight()
Performs Deep-first Search calling a visitor for each node, from right to left

**Kind**: global function  
**See**: [DFS](https://en.wikipedia.org/wiki/Depth-first_search)  
<a name="visitLeaves"></a>

## visitLeaves()
Performs Deep-first Search calling a visitor only over leaves

**Kind**: global function  
**See**: [DFS](https://en.wikipedia.org/wiki/Depth-first_search)  
<a name="fromSentence"></a>

## fromSentence(sentence, [doubleLink]) ⇒ <code>Tree</code>
**Kind**: global function  
**Returns**: <code>Tree</code> - tree  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sentence | <code>Sentence</code> |  |  |
| [doubleLink] | <code>boolean</code> | <code>false</code> | whether the child nodes should have a reference to their parent or not - this allows the use of [Node.parent()](Node.parent()) |

<a name="fromString"></a>

## fromString(str, [doubleLink]) ⇒ <code>Tree</code>
**Kind**: global function  
**Returns**: <code>Tree</code> - tree  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>string</code> |  |  |
| [doubleLink] | <code>boolean</code> | <code>false</code> | whether the child nodes should have a reference to their parent or not - this allows the use of [Node.parent()](Node.parent()) |

<a name="DocumentJSON"></a>

## DocumentJSON
The CoreNLP API JSON structure representing a document

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| index | <code>number</code> | 
| sentences | <code>Array.&lt;Sentence&gt;</code> | 

<a name="ExpressionSentenceMatchGroup"></a>

## ExpressionSentenceMatchGroup
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | group label |
| begin | <code>number</code> | 0-based index of the matched group, relative to the given text |
| end | <code>number</code> | 0-based index of the matched group, relative to the given text |
| token | <code>Token</code> | onluy given if aggregated with an annotated Sentence or Document |
| $[label | <code>[ExpressionSentenceMatchGroup](#ExpressionSentenceMatchGroup)</code> | other groups inside |

<a name="ExpressionSentenceMatchJSON"></a>

## ExpressionSentenceMatchJSON
A ExpressionSentenceMatch of either `TokensRegex`, `Semrgex` or `Tregex`.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| begin | <code>number</code> | word begin position, starting from zero |
| end | <code>number</code> | word end position, starting from zero (no match ends at 0) |
| text | <code>string</code> | matched text |
| $[label | <code>string</code> | any label, as defined in the expression pattern |

<a name="ExpressionJSON"></a>

## ExpressionJSON
The CoreNLP API JSON structure representing an expression
This expression structure can be found as the output of `TokensRegex`,
`Semrgex` and `Tregex`.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| index | <code>number</code> | 
| sentences | <code>Array.&lt;Array.&lt;ExpressionSentenceMatch&gt;&gt;</code> | 

<a name="GovernorJSON"></a>

## GovernorJSON
The CoreNLP API JSON structure representing a governor

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| dep | <code>string</code> | 
| governor | <code>number</code> | 
| governorGloss | <code>string</code> | 
| dependent | <code>number</code> | 
| dependentGloss | <code>string</code> | 

<a name="SentenceJSON"></a>

## SentenceJSON
The CoreNLP API JSON structure representing a sentence

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | 1-based index, as they come indexed by StanfordCoreNLP |
| tokens | <code>Array.&lt;Token&gt;</code> |  |

<a name="TokenJSON"></a>

## TokenJSON
The CoreNLP API JSON structure representing a token

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| index | <code>number</code> | 
| word | <code>string</code> | 
| originalText | <code>string</code> | 
| characterOffsetBegin | <code>number</code> | 
| characterOffsetEnd | <code>number</code> | 
| before | <code>string</code> | 
| after | <code>string</code> | 

<a name="PosInfo"></a>

## PosInfo
PosInfo does not come as part of the CoreNLP.  It is an indexed reference of POS tags
by language provided by this library.  It's only helpful for analysis and study.  The
data was collected from different documentation resources on the Web.
The PosInfo may vary depending on the POS annotation types used, for example, CoreNLP
for Spanish uses custom POS tags developed by Stanford, but this can also be changed 
to Universal Dependencies, which uses different tags.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| group | <code>string</code> | 
| tag | <code>string</code> | 
| examples | <code>Array.&lt;string&gt;</code> | 

<a name="DeterministicCorefAnnotator
TODO ??external_"></a>

## DeterministicCorefAnnotator
TODO ?? ⇐ <code>Annotator</code>
Class representing an DeterministicCorefAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [DeterministicCorefAnnotator](https://stanfordnlp.github.io/CoreNLP/coref.html)  
<a name="DependencyParseAnnotator
Hydrates {@link Sentence.governors_new}external_"></a>

## DependencyParseAnnotator
Hydrates {@link Sentence.governors()} ⇐ <code>Annotator</code>
Class representing an DependencyParseAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [DependencyParseAnnotator](https://stanfordnlp.github.io/CoreNLP/depparse.html)  
<a name="MorphaAnnotator
Hydrates {@link Token.lemma_new}external_"></a>

## MorphaAnnotator
Hydrates {@link Token.lemma()} ⇐ <code>Annotator</code>
Class representing an MorphaAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [MorphaAnnotator](https://stanfordnlp.github.io/CoreNLP/lemma.html)  
<a name="NERClassifierCombiner
Hydrates {@link Token.ner_new}external_"></a>

## NERClassifierCombiner
Hydrates {@link Token.ner()} ⇐ <code>Annotator</code>
Class representing an NERClassifierCombiner.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [NERClassifierCombiner](https://stanfordnlp.github.io/CoreNLP/ner.html)  
<a name="ParserAnnotator
Hydrates {@link Token.parse_new}external_"></a>

## ParserAnnotator
Hydrates {@link Token.parse()} ⇐ <code>Annotator</code>
Class representing an ParserAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [ParserAnnotator](https://stanfordnlp.github.io/CoreNLP/parse.html)  
<a name="POSTaggerAnnotator
Hydrates {@link Token.pos_new}external_"></a>

## POSTaggerAnnotator
Hydrates {@link Token.pos()} ⇐ <code>Annotator</code>
Class representing an POSTaggerAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [POSTaggerAnnotator](https://stanfordnlp.github.io/CoreNLP/pos.html)  
<a name="RegexNERAnnotator
TODO ??external_"></a>

## RegexNERAnnotator
TODO ?? ⇐ <code>Annotator</code>
Class representing an RegexNERAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [RegexNERAnnotator](https://stanfordnlp.github.io/CoreNLP/regexner.html)  
<a name="RelationExtractorAnnotator
TODO ??external_"></a>

## RelationExtractorAnnotator
TODO ?? ⇐ <code>Annotator</code>
Class representing an RelationExtractorAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [RelationExtractorAnnotator](https://stanfordnlp.github.io/CoreNLP/relation.html)  
<a name="WordsToSentenceAnnotator
Combines multiple {@link Token}s into sentencesexternal_"></a>

## WordsToSentenceAnnotator
Combines multiple {@link Token}s into sentences ⇐ <code>Annotator</code>
Class representing an WordsToSentenceAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [WordsToSentenceAnnotator](https://stanfordnlp.github.io/CoreNLP/ssplit.html)  
<a name="TokenizerAnnotator
Identifies {@link Token}sexternal_"></a>

## TokenizerAnnotator
Identifies {@link Token}s ⇐ <code>Annotator</code>
Class representing an TokenizerAnnotator.

**Kind**: global external  
**Extends:** <code>Annotator</code>  
**See**: [TokenizerAnnotator](https://stanfordnlp.github.io/CoreNLP/tokenize.html)  

## External Reference

We will update this section soon.  In the meantime, you can browse the project codebase and read the @jsdoc referenecs.
In summary, this NodeJS library aims to replicate the CoreNLP Simple Java interface but in Javascript.  There are some minor differences however, for example the need to call `applyAnnotator` asynchronously.

```bash
Properties
Pipeline
Service
ConnectorServer                   # https://stanfordnlp.github.io/CoreNLP/corenlp-server.html
ConnectorCli                      # https://stanfordnlp.github.io/CoreNLP/cmdline.html
CoreNLP
  simple                          # https://stanfordnlp.github.io/CoreNLP/simple.html
    Annotable
    Annotator
    Document
    Sentence
    Token
    annotator                     # https://stanfordnlp.github.io/CoreNLP/annotators.html
      TokenizerAnnotator          # https://stanfordnlp.github.io/CoreNLP/tokenize.html
      WordsToSentenceAnnotator    # https://stanfordnlp.github.io/CoreNLP/ssplit.html
      POSTaggerAnnotator          # https://stanfordnlp.github.io/CoreNLP/pos.html
      MorphaAnnotator             # https://stanfordnlp.github.io/CoreNLP/lemma.html
      NERClassifierCombiner       # https://stanfordnlp.github.io/CoreNLP/ner.html
      ParserAnnotator             # https://stanfordnlp.github.io/CoreNLP/parse.html
      DependencyParseAnnotator    # https://stanfordnlp.github.io/CoreNLP/depparse.html
      RelationExtractorAnnotator  # https://stanfordnlp.github.io/CoreNLP/relation.html
      DeterministicCorefAnnotator # https://stanfordnlp.github.io/CoreNLP/coref.html
  util
    Tree                          # http://www.cs.cornell.edu/courses/cs474/2004fa/lec1.pdf
```


* * *

&copy; 2017 Gerardo Bort &lt;gerardobort@gmail.com&gt; under GPL-3.0 Licence. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).

## [StanfordCoreNLP Reference](https://github.com/stanfordnlp/CoreNLP)

Manning, Christopher D., Mihai Surdeanu, John Bauer, Jenny Finkel, Steven J. Bethard, and David McClosky. 2014. The Stanford CoreNLP Natural Language Processing Toolkit In Proceedings of the 52nd Annual Meeting of the Association for Computational Linguistics: System Demonstrations, pp. 55-60.
