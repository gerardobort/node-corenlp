import Service from '../service';

/**
 * @class
 * @classdesc Class representing a Sentence Tree Node
 */
export class Node {
  constructor(pos = '', word = '', children = [], paren = null) {
    this._pos = pos;
    this._word = word;
    this._children = children;
    this._parent = paren;
  }

  pos() {
    return this._pos;
  }

  posInfo() {
    // itf it's a subtree
    if (this._children.length) {
      return Service.getSentenceParseInfo(this._pos, this.getLanguageISO());
    }

    // if it's a leaf
    return Service.getTokenPosInfo(this._pos, this.getLanguageISO());
  }

  token(token = null) {
    if (token) {
      this._token = token;
    }

    return this._token;
  }

  word() {
    return this._word;
  }

  /**
   * Sets the language ISO (given by the pipeline during the annotation process)
   * This is solely to keep track of the language chosen for further analysis
   * @return {string} text
   */
  setLanguageISO(iso) {
    this._language = iso;
  }

  /**
   * Retrieves the language ISO
   * @return {string} text
   */
  getLanguageISO() {
    return this._language;
  }

  children() {
    return this._children;
  }

  appendChild(node) {
    this._children.push(node);
  }

  parent(paren = null) {
    if (paren) {
      this._parent = paren;
    }

    return this._parent;
  }

  toJSON() {
    return {
      pos: this._pos,
      posInfo: this.posInfo(),
      word: this._word,
      token: this._token,
      children: this._children,
    };
  }
}

/**
 * @class
 * @classdesc Class representing a Parse tree structure
 * @memberof CoreNLP/util
 * @description
 * The nodes are given in order left to right as the words in a sentence appears
 * The leaves are grouped into semantic representations provided by the Annotator
 * This class is pretty useful to use along with the ParserAnnotator
 * @see inspired on {@link http://www.nltk.org/howto/tree.html|Tree}
 * @see the lecture {@link http://www.cs.cornell.edu/courses/cs474/2004fa/lec1.pdf|Tree Syntax of Natural Language}
 */
class Tree {
  /**
   * Create a Tree
   * @param {Node} node
   */
  constructor(node) {
    this.rootNode = node;
  }

  /**
   * Get a Tree string representation for debugging purposes
   * @returns {string} tree
   */
  dump() {
    return JSON.stringify(this.rootNode, (key, val) => {
      if (val instanceof Node) {
        return val.children().length ? {
          pos: val.pos(),
          info: val.info(),
          children: val.children(),
        } : {
          pos: val.pos(),
          info: val.info(),
          word: val.word(),
          token: val.token(),
        };
      }

      return val;
    }, 2);
  }

  /**
   * Performs Deep-first Search calling a visitor for each node
   * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
   */
  visitDeepFirst(visitor, node = this.rootNode) {
    node.children().forEach((childNode) => {
      this.visitDeepFirst(visitor, childNode);
      visitor(childNode);
    });

    visitor(node);
  }

  /**
   * Performs Deep-first Search calling a visitor for each node, from right to left
   * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
   */
  visitDeepFirstRight(visitor, node = this.rootNode) {
    node.children().reverse().forEach((childNode) => {
      this.visitDeepFirstRight(visitor, childNode);
      visitor(childNode);
    });

    visitor(node);
  }

  /**
   * Performs Deep-first Search calling a visitor only over leaves
   * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
   */
  visitLeaves(visitor, node = this.rootNode) {
    node.children().forEach((childNode) => {
      if (childNode.children().length) {
        this.visitLeaves(visitor, childNode);
      } else {
        visitor(childNode);
      }
    });

    if (!node.children().length) {
      visitor(node);
    }
  }

  /**
   * @param {Sentence} sentence
   * @param {boolean} [doubleLink] whether the child nodes should have a reference
   * to their parent or not - this allows the use of {@link Node.parent()}
   * @returns {Tree} tree
   */
  static fromSentence(sentence, doubleLink = false) {
    const parse = sentence.parse();
    if (!parse) {
      throw new Error('Unable to create Tree from Sentence, did you run ParserAnnotator first?');
    }

    const tree = Tree.fromString(parse, doubleLink);
    // link nodes with tokens
    let visitedLeaves = 0;
    // eslint-disable-next-line no-plusplus
    tree.visitLeaves(node => node.token(sentence.token(visitedLeaves++)));

    const languageIso = sentence.getLanguageISO();
    if (languageIso) {
      tree.visitDeepFirst(node => node.setLanguageISO(languageIso));
    }

    return tree;
  }

  /**
   * @param {string} str
   * @param {boolean} [doubleLink] whether the child nodes should have a reference
   * to their parent or not - this allows the use of {@link Node.parent()}
   * @returns {Tree} tree
   */
  static fromString(str, doubleLink = false) {
    return new Tree(this._transformTree(this._buildTree(str), doubleLink));
  }

  static _buildTree(str) {
    let currentNode = { children: [] };
    const openNodes = [currentNode];
    const l = str.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < l; i++) {
      if (str[i] === '(') {
        currentNode = { str: '', children: [] };
        openNodes[openNodes.length - 1].children.push(currentNode);
        openNodes.push(currentNode);
      } else if (str[i] === ')') {
        this._cleanNode(currentNode);
        openNodes.pop();
        currentNode = openNodes[openNodes.length - 1];
      } else {
        currentNode.str += str[i];
      }
    }
    return currentNode.children[0];
  }

  static _cleanNode(node) {
    const str = node.str.trim();
    const delimiterPos = str.indexOf(' ');
    if (delimiterPos > -1) {
      // eslint-disable-next-line no-param-reassign
      node.pos = str.substr(0, delimiterPos);
      // eslint-disable-next-line no-param-reassign
      node.word = str.substr(delimiterPos + 1);
    } else {
      // eslint-disable-next-line no-param-reassign
      node.pos = str;
    }
  }

  static _transformTree(node, doubleLink) {
    if (doubleLink) {
      const parentNode = new Node(node.pos, node.word);
      node.children.forEach((n) => {
        const childNode = this._transformTree(n);
        childNode.parent(parentNode);
        parentNode.appendChild(childNode);
      });

      return parentNode;
    }

    return new Node(node.pos, node.word, node.children.map(n => this._transformTree(n)));
  }
}

export default Tree;
