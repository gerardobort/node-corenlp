const connector = new CoreNLP.ConnectorServer({ dsn: 'http://localhost:9002' });
const props = new CoreNLP.Properties({ annotators: 'tokenize,ssplit,pos,lemma,ner,parse,depparse' });
const inputSentence = document.getElementById('input-sentence');
const info = document.getElementById('info');
let pipeline = new CoreNLP.Pipeline(props, 'Spanish', connector);

function loadSentenceTree(text) {
  // handle input / url text
  if (text) {
    const search = `?text=${escape(text)}`;
    window.history.pushState(null,"", search);
  } else {
    text = unescape(document.location.search.replace(/^.*[&\?]text=([^&]*)$/i, '$1'));
  }
  inputSentence.value = text;
  info.innerHTML = '';

  // remove previous tree if present
  d3.select('body svg').remove();

  // ************** Generate the tree diagram  *****************
  const margin = { top: 80, right: 20, bottom: 240, left: 20 };
  const width = window.innerWidth - margin.right - margin.left;
  const height = window.innerHeight - margin.top - margin.bottom;

  // https://github.com/wbkd/d3-extended
  d3.selection.prototype.moveToFront = function() {  
    return this.each(function() {
      this.parentNode.appendChild(this);
    });
  };

  d3.selection.prototype.moveToBack = function() {  
      return this.each(function() { 
          const firstChild = this.parentNode.firstChild; 
          if (firstChild) { 
              this.parentNode.insertBefore(this, firstChild); 
          } 
      });
  };

  const diagonal = d3.linkHorizontal()
    .x(d => d.x)
    .y(d => d.y);

  const svg = d3.select('body').append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .style('pointer-events', 'all')
    .call(d3.zoom().scaleExtent([1 / 2, 4]).on('zoom', () => svg.attr('transform', d3.event.transform)))
    .append('g')


  const duration = 600;
  let root;
  let governors;
  let sentenceTokens;
  let i = 0;

  // declares a tree layout and assigns the size
  const treemap = d3
    .tree()
    .size([width, height])
    .separation((a,b) => a.parent === b.parent ? 100 : 50);

  // Load data
  const sentText = unescape(document.location.search.replace(/^\?text=/, ''));
  const sent = new CoreNLP.default.simple.Sentence(sentText);
  pipeline.annotate(sent)
    .then(function(sent) {
      const sentence = sent.toJSON();
      const tree = CoreNLP.default.util.Tree.fromSentence(sent);
      const treeData = JSON.parse(tree.dump());
      governors = sentence.enhancedPlusPlusDependencies;
      sentenceTokens = sentence.tokens;

      // Assigns parent, children, height, depth
      root = d3.hierarchy(treeData, d => d.children);
      root.x0 = width / 2;
      root.y0 = 0;

      // Collapse after the second level
      // root.children.forEach(collapse);

      update(root);
    });

  // Collapse the node and all it's children
  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function update(source) {

    // Assigns the x and y position for the nodes
    const treeData = treemap(root);

    // Compute the new tree layout.
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(d => d.y = d.depth * 80 + margin.top);

    // ****************** Nodes section ***************************

    // Update the nodes... set ids if not set
    const node = svg.selectAll('g.node')
      .data(nodes, d => d.id || (d.id = ++i));

    // Enter any new modes at the parent's previous position.
    const nodeEnter = node.enter().append('g')
      .attr('class', d => `node ${d.data.pos}`)
      .attr('transform', d => `translate(${source.x0}, ${source.y0})`)
      .on('click', click)
      .on('mouseenter', mouseenter)
      .on('mouseleave', mouseleave);

    // Add labels for the nodes
    nodeEnter.append('text')
      .attr('id', d => `text1-${d.id}`) // set id
      .text(d => d.data.posInfo && d.data.posInfo.tag ? d.data.posInfo.tag.replace(/\(.*$/, '') : (d.data.posInfo||{}).description)
      .style('font-size', d => `${32 - 3*d.depth}px`)

    nodeEnter.insert('rect', ':last-child')
      .attr('id', d => `rect1-${d.id}`) // set id
      .attrs(d => d3.select(`#text1-${d.id}`).node().getBBox())

    nodeEnter.append('text')
      .attr('id', d => `text2-${d.id}`) // set id
      .attr('dy', d => d3.select(`#text1-${d.id}`).node().getBBox().height+10)
      .text(d => d.data.word);

    nodeEnter.insert('rect', ':last-child')
      .attr('id', d => `rect2-${d.id}`) // set id
      .attr('class', 'token')
      .attrs(d => d3.select(`#text2-${d.id}`).node().getBBox())

    // UPDATE
    const nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(duration)
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // Update the node attributes and style
    nodeUpdate.select('rect')
      .attr('class', d => d._children ? 'expandable' : '');

    // Remove any exiting nodes
    const nodeExit = node.exit().transition()
      .duration(duration)
      .attr('transform', d => `translate(${source.x}, ${source.y})`)
      .remove();

    // On exit reduce the opacity of text labels
    nodeExit.attr('class', 'node hide');

    // ****************** links section ***************************

    // Update the links...
    const link = svg.selectAll('path.link')
      .data(links, d => d.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .attr('d', d => diagonal({ x: source.x0, y: source.y0 }, { x: source.x0, y: source.y0 }));

    // UPDATE
    const linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(duration)
      .attr('d', d => diagonal(d, d.parent));

    // Remove any exiting links
    const linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', d => diagonal(source, source))
      .remove();

    svg.selectAll('path.link-tokens').remove();
    svg.selectAll('path.link-govs').remove();
    svg.selectAll('text.label-govs').remove();

    // Store the old positions for transition.
    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    // tree links
    function diagonal(s, d) {
      return `M ${s.x} ${s.y}
              C ${(s.x)} ${(s.y + d.y)/2},
                ${(s.x)} ${(s.y + d.y)/2},
                ${d.x} ${d.y}`;
    }

    // token links
    function diagonal2(s, d) {
      return `M ${s.x} ${s.y}
              C ${(d.x)} ${(s.y)},
                ${(s.x)} ${(d.y)},
                ${d.x} ${d.y}`;
    }

    // governor links
    function diagonal3(s, d) {
      return `M ${s.x} ${s.y}
              C ${(s.x)} ${(s.y)*1.5},
                ${(d.x)} ${(d.y)*1.5},
                ${d.x} ${d.y}`;
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    function mouseenter(d, n, nodes) {
      const text1 = d3.select(`#text1-${d.id}`);
      const rect1 = d3.select(`#rect1-${d.id}`);
      // Bring to front the hovering node
      d3.select(rect1.node()).moveToFront();
      d3.select(text1.node()).moveToFront();
      rect1.attr('class', 'hover');

      // Highlight leafs (tokens) as they're key to read 
      const tokens = d.descendants().filter(d => d.data.token).sort((d1, d2) => d1.data.token.index - d2.data.token.index);
      const leafs = [];
      let lastToken;

      // link groups of tokens with words highlighting
      tokens
        .forEach(dt => {
          const text2 = d3.select(`#text2-${dt.id}`);
          const rect2 = d3.select(`#rect2-${dt.id}`);
          text2.attr('class', 'highlighted')
          text2BBox = text2.node().getBBox();
          rect2.attrs(text2BBox);

          // link tuples of token nodes
          if (lastToken) {
            const links = [lastToken, dt];
            const link = svg.selectAll(`path.link-tokens.tuple-${dt.id}`).data(links, dt => dt.id);

            const linkEnter = link.enter().insert('path', 'g')
              .attr('class', 'link-tokens')
              .attr('d', dt => diagonal2({ x: lastToken.x0, y: lastToken.y0 + text2BBox.height*.75 }, { x: dt.x0, y: dt.y0 + text2BBox.height*.75 }));

            const linkExit = link.exit().remove();
          }
          lastToken = dt;
          leafs.push(lastToken);
        });

      info.innerHTML = `
<table>
  <tr>
    <th>Word</th>
    <th>NER</th>
    <th>POS</th>
    <th>POS group</th>
    <th>POS tag</th>
  </tr>
  ${leafs.map(leaf => (`<tr>
    <td>${leaf.data.token.originalText}</td>
    <td>${leaf.data.token.ner}</td>
    <td>${leaf.data.pos}</td>
    <td>${leaf.data.posInfo.group}</td>
    <td>${leaf.data.posInfo.tag}</td>
  <tr>`)).join('')}
</table>
`;

      // link words with others via governors annotations
      if (d.data.token) {
        const tokenFrom = 'governor';
        const tokenTo = 'dependent';
        const allNodes = d.ancestors().pop().descendants();
        const tokenGovs = governors
          .filter(g => g[tokenFrom] && sentenceTokens[g[tokenFrom]-1].characterOffsetBegin === d.data.token.characterOffsetBegin);
        const govNodes = tokenGovs
          .map(g => allNodes.find(dc => dc.data.token && g[tokenTo] && dc.data.token.index === g[tokenTo])).filter(Boolean);
        const text2 = d3.select(`#text2-${d.id}`);
        const text2BBox = text2.node().getBBox();

        govNodes.forEach((dx, i) => {
          const link = svg.selectAll(`path.link-govs.tuple-${i}`).data(govNodes, dg => dg.id);
          const linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link-govs')
            .attr('d', (dg, i) => {
              const relData = tokenGovs[i];
              link.enter().insert('text')
                .text(relData.depInfo ? relData.depInfo.type : relData.dep)
                .attrs({
                  class: 'label-govs',
                  x: d.x + (dg.x-d.x)*0.4,
                  y: d.y + (dg.y-d.y)*0.2 + 180,
                })
              return diagonal3({ x: d.x0, y: d.y0 + text2BBox.y + text2BBox.height }, { x: dg.x0, y: dg.y0 + text2BBox.y + text2BBox.height })
            })

          const linkExit = link.exit().remove();
        });
      }
    }

    function mouseleave(d) {
      const text1 = d3.select(`#text1-${d.id}`);
      const rect1 = d3.select(`#rect1-${d.id}`);
      // Bring to front the hovering node
      d3.select(text1.node()).moveToBack();
      d3.select(rect1.node()).moveToBack();
      rect1.attr('class', d => d._children ? 'expandable' : '' );

      // Highlight leafs (tokens) as they're key to read 
      const tokens = d.descendants().filter(d => d.data.token);
      tokens
        .forEach(d => {
          const text2 = d3.select(`#text2-${d.id}`);
          const rect2 = d3.select(`#rect2-${d.id}`);
          text2.attr('class', 'no-highlighted')
          rect2.attrs(text2.node().getBBox());
        });

      svg.selectAll('path.link-tokens').remove();
      svg.selectAll('path.link-govs').remove();
      svg.selectAll('text.label-govs').remove();
    }
  }

}

function focusInput() {
  inputSentence.focus();
}

function initializeSpeech2Text() {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const lang = document.getElementById('lang');
  recognition.interimResults = true;
  recognition.lang = lang.value;

  lang.addEventListener('change', e => {
    const iso2corenlp = {
      es: 'Spanish',
      en: 'English',
      de: 'German',
      fr: 'French',
      ar: 'Arabic',
      zh: 'Chinese',
    };
    recognition.lang = lang.value;
    pipeline = new CoreNLP.Pipeline(props, iso2corenlp[lang.value], connector);
  });

  recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    if (e.results[0].isFinal) {
      loadSentenceTree(transcript);
    }
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();
}
