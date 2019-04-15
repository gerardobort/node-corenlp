import Annotator from '../annotator';
import NaturalLogicAnnotator from './natlog';
import DependencyParseAnnotator from './depparse';
import CorefAnnotator from './coref';

// TODO: Requirements are missing here https://stanfordnlp.github.io/CoreNLP/annotators.html, verify.

/**
 * @class
 * @classdesc Class representing an OpenIE Annotator.
 * @extends Annotator
 * @memberof CoreNLP/simple/annotator
 * @requires natlog
 * @see {@link https://stanfordnlp.github.io/CoreNLP/openie.html|OpenIEAnnotator}
 */
class OpenIEAnnotator extends Annotator {
  /**
   * Create an Annotator
   * @param {Object} [options] a key-value map of options, without the annotator prefix
   */
  constructor(options = {}) {
    super(
      'openie',
      {
        // format (Enum) default   One of {reverb, ollie, default, qa_srl}. Changes the output form
        // filelist (filepath) null   A path to a file, which contains files to annotate.
        // threads (integer) number   of cores   The number of threads to run on.
        // max_entailments_per_clause   (integer)   1000  The maximum number of entailments to prod
        resolve_coref: false, //   (boolean)   false     If true, run coreference (and consequently
        // ignore_affinity   (boolean)   false     Whether to ignore the affinity model for preposi
        // affinity_probability_cap   (double)   1  /3   The affinity value above which confidence
        // triple.strict   (boolean)   true     If true, extract triples only if they consume the e
        triple: { all_nominals: false }, //     If true, extract nominal relations always and not o
        // splitter.model   (filepath)       You   can override the default location of the clause
        // splitter.nomodel   (boolean)   false     Run without a clause splitting model – that is,
        // splitter.disable   (boolean)   false     Don’t split clauses at all, and only extract re
        // affinity_models   (filepath)
        ...options,
      },
      options.resolve_coref
        ? [
          new CorefAnnotator(),
          new DependencyParseAnnotator(),
          new NaturalLogicAnnotator(),
        ]
        : [new NaturalLogicAnnotator()],
    );
  }
}

export default OpenIEAnnotator;
