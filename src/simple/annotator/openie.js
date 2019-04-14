import Annotator from '../annotator';
import NaturalLogicAnnotator from './natlog';

//TODO: Requirements are missing here https://stanfordnlp.github.io/CoreNLP/annotators.html, verify.

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
        // format	(Enum)	default  	One of {reverb, ollie, default, qa_srl}. Changes the output format of the program. Default will produce tab-separated columns for confidence, the subject, relation, and the object of a relation. ReVerb will output a TSV in the ReVerb format. Ollie will output relations in the default format returned by Ollie.
        // filelist	(filepath)	null  	A path to a file, which contains files to annotate. Each file should be on its own line. If this option is set, only these files are annotated and the files passed via bare arguments are ignored.
        // threads	(integer)	number   of cores	The number of threads to run on. By default, this is the number of cores in the system.
        // max_entailments_per_clause	(integer)	1000  	The maximum number of entailments to produce for each clause extracted in the sentence. The larger this value is, the slower the system will run, but the more relations it can potentially extract. Setting this below 100 is not recommended; setting it above 1000 is likewise not recommended.
        // resolve_coref	(boolean)	false  	If true, run coreference (and consequently NER as a dependency of coreference) and replace pronominal mentions with their canonical mention in the text.
        // ignore_affinity	(boolean)	false  	Whether to ignore the affinity model for prepositional attachments.
        // affinity_probability_cap	(double)	1  /3	The affinity value above which confidence of the extraction is taken as 1.0.
        // triple.strict	(boolean)	true  	If true, extract triples only if they consume the entire fragment. This is useful for ensuring that only logically warranted triples are extracted, but puts more burden on the entailment system to find minimal phrases (see -max_entailments_per_clause).
        // triple.all_nominals	(boolean)	false  	If true, extract nominal relations always and not only when a named entity tag warrants it. This greatly overproduces such triples, but can be useful in certain situations.
        // splitter.model	(filepath)	 	You   can override the default location of the clause splitting model with this option.
        // splitter.nomodel	(boolean)	false  	Run without a clause splitting model – that is, split on every clause.
        // splitter.disable	(boolean)	false  	Don’t split clauses at all, and only extract relations centered around the root verb.
        // affinity_models	(filepath)	  
        ...options,
      },
      [
        new NaturalLogicAnnotator(),
      ],
    );
  }
}

export default OpenIEAnnotator;