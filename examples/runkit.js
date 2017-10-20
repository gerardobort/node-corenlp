// requires ployfill for ES7 async/await
require("babel-polyfill");

const corenlp = require("corenlp");
const CoreNLP = corenlp.default; // convenient when not using `import`

/**
 * IMPORTANT
 * The server http://corenlp.run is used here just for demo purposes.
 * It is not set up to handle a large volume of requests. Instructions for 
 * setting up your own server can be found in the Dedicated Server section (link below).
 * @see {@lik https://stanfordnlp.github.io/CoreNLP/corenlp-server.html}
 * @see {@link http://corenlp.run}
 */
const connector = new corenlp.ConnectorServer({
    dsn: 'http://corenlp.run',
});

// initialize the pipeline and document to annotate
const props = new corenlp.Properties({
    annotators: 'tokenize,ssplit,pos,ner,parse',
});
const pipeline = new corenlp.Pipeline(props, 'Spanish', connector);
const sent = new CoreNLP.simple.Sentence(
    'Jorge quiere cinco empanadas de queso y carne.'
);

// performs the call to corenlp (in this case via http)
await pipeline.annotate(sent);

// constituency parse string representation
console.log('parse', sent.parse());

// constituency parse tree representation
const tree = CoreNLP.util.Tree.fromSentence(sent);

// traverse the tree leaves and print some props
tree.visitLeaves(node =>
  console.log(node.word(), node.pos(), node.token().ner()));
  
// dump the tree for debugging
console.log(JSON.stringify(tree.dump(), null, 2));
