import _ from 'lodash';
import Service from '../../service';

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

  info() {
    if (this._children.length) {
      return Service.getSentenceParseInfo(this._pos);
    }

    return Service.getTokenPosInfo(this._pos);
  }

  token(token = null) {
    if (token) {
      return this._token = token;
    }

    return this._token;
  }

  word() {
    return this._word;
  }

  children() {
    return this._children;
  }

  appendChild(node) {
    this._children.push(node);
  }

  parent(paren = null) {
    if (paren) {
      return this._parent = paren;
    }

    return this._parent;
  }
}

/**
 * Class representing a Parse tree structure
 * The nodes are given in order left to right as the words in a sentence appears
 * The leaves are grouped into semantic representations provided by the Annotator
 * This class is pretty useful to use along with the ParserAnnotator
 * @see inspired on {@link http://www.nltk.org/howto/tree.html|Tree}
 * @see the lecture {@link http://www.cs.cornell.edu/courses/cs474/2004fa/lec1.pdf|Tree Syntax of Natural Language}
 */
export default class Tree {
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
    node.children().forEach(childNode => {
      this.visitDeepFirst(childNode);
      visitor(childNode)
    });

    visitor(node);
  }

  /**
   * Performs Deep-first Search calling a visitor for each node, from right to left
   * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
   */
  visitDeepFirstRight(visitor) {
    node.children().reverse().forEach(childNode => {
      this.visitDeepFirst(childNode);
      visitor(childNode)
    });

    visitor(node);
  }

  /**
   * Performs Deep-first Search calling a visitor only over leaves
   * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
   */
  visitLeaves(visitor, node = this.rootNode) {
    node.children().forEach(childNode => {
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
    tree.visitLeaves(node => node.token(sentence.token(visitedLeaves++)));

    return tree;
  }

  /**
   * @param {string} str
   * @param {boolean} [doubleLink] whether the child nodes should have a reference
   * to their parent or not - this allows the use of {@link Node.parent()}
   * @returns {Tree} tree
   */
  static fromString(str, doubleLink = false) {
    const buildTree = str => {
      let currentNode = { children: [] };
      const openNodes = [currentNode];
      const l = str.length;
      for (let i = 0; i < l; i++) {
        if (str[i] === '(') {
          currentNode = { str: '', children: [] };
          openNodes[openNodes.length - 1].children.push(currentNode);
          openNodes.push(currentNode);
        } else if (str[i] === ')') {
          cleanNode(currentNode);
          openNodes.pop();
          currentNode = openNodes[openNodes.length-1];
        } else {
          currentNode.str += str[i];
        }
      }
      return currentNode.children[0];
    };

    const cleanNode = node => {
      const str = node.str.trim();
      const delimiterPos = str.indexOf(' ');
      if (delimiterPos > -1) {
        node.pos = str.substr(0, delimiterPos);
        node.word = str.substr(delimiterPos + 1);
      } else {
        node.pos = str;
      }
    };

    const transformTree = node => {
      if (doubleLink) {
        const parentNode = new Node(node.pos, node.word);
        node.children.forEach(n => {
          const childNode = transformTree(n);
          childNode.parent(parentNode);
          parentNode.appendChild(childNode);
        });

        return parentNode;
      }

      return new Node(node.pos, node.word, node.children.map(n => transformTree(n)));
    };

    return new Tree(transformTree(buildTree(str)));
  }

}
