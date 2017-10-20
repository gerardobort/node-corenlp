require("babel-polyfill");
const corenlp = require("corenlp"), CoreNLP = corenlp.default;
const Properties = corenlp.Properties;
const Pipeline = corenlp.Pipeline;
const ConnectorServer = corenlp.ConnectorServer;
/**
 * NOTE: The server http://corenlp.run is used here just for demo purposes.
 * It is not set up to handle a large volume of requests. Instructions for 
 * setting up your own server can be found in the Dedicated Server section (link below).
 * @see {@lik https://stanfordnlp.github.io/CoreNLP/corenlp-server.html}
 * @see {@link http://corenlp.run}
 */
const connector = new ConnectorServer({ dsn: 'http://corenlp.run' });
const props = new Properties({ annotators: 'tokenize,ssplit,pos,parse' });
const pipeline = new Pipeline(props, 'Spanish', connector);

const sent = new CoreNLP.simple.Sentence('...contemplando la membrana azul de tus ojos fulminando el tiempo, y el espacio.');

// The response might take few seconds...
pipeline.annotate(sent)
    .then(sent => {
        console.log(sent.tokens().map(token => `${token}: ${token.pos()}`));
        console.log(sent.tokens().map(token => `${token}: ${token.posInfo().tag}`));
    })
    .catch(err => {
        console.log('err', err);
    });
