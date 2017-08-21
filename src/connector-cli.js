import { exec } from 'child-process-promise';
import tmpFile from 'tmp-file';
import loadJSONFile from 'load-json-file';

// example: java -cp "corenlp/stanford-corenlp-full-2017-06-09/*" edu.stanford.nlp.pipeline.StanfordCoreNLP -props StanfordCoreNLP-spanish.properties -annotators tokenize,ssplit,pos -outputFormat json
const config = {
  classPath: 'corenlp/stanford-corenlp-full-2017-06-09/*',
  mainClass: 'edu.stanford.nlp.pipeline.StanfordCoreNLP',
  props: 'StanfordCoreNLP-spanish.properties',
};

export default class ConnectorCli {
  constructor({ classPath = config.classPath, mainClass = config.mainClass, props = config.props }) {
    this.classPath = classPath;
    this.mainClass = mainClass;
    this.props = props;
  }

  /**
   * @returns {Promise.<Object>}
   */
  get({ annotators, text, options, language }) {
    const params = [
      `-cp`, `'${this.classPath}'`,
      `${this.mainClass}`,
      `-props`, `${this.props}`,
      `-annotators`, `${annotators.join()}`,
      `-outputFormat`, `json`,
    ];

    return tmpFile(`"${text}"`).then(file =>
        exec('java ' + params.concat([`-file ${file.path}`]).join(' '))
        .then((result) => {
            const stdout = result.stdout || result.stderr
            const outfile = stdout.match(/writing to (.*\.json)/)[1];
            return loadJSONFile(outfile);
        }));
  }
};
