declare namespace CoreNLP {
  type CorefAnimacy = 'ANIMATE' | 'INANIMATE' | 'UNKNOWN';
  type CorefGender = 'FEMALE' | 'MALE' | 'UNKNOWN'
  type CorefNumber = 'SINGULAR' | 'PLURAL' | 'UNKNOWN';
  type CorefType = 'PRONOMINAL' | 'NOMINAL' | 'PROPER' | 'LIST';

  class Properties {
    constructor(props: { [key: string]: any });
    setProperty(name: string, value: any): void;
    getProperty(name: string, defaultValue?: any): any;
    getProperties(): { [key: string]: any };
    toJSON(): { [key: string]: any };
    toPropertiessFileContent(): string; // [sic]
  }

  class Pipeline {
    constructor(properties: Properties, language: string, connector?: ConnectorServer | ConnectorCLI);
    getService(): Service;
    annotate<T extends simple.Annotable>(annotable: T): Promise<T>;
    assert(methodName?: string, requiredAnnotators?: simple.Annotator[]): void;
    annotateTokensRegex<T extends simple.Annotable & simple.Expression>(
      annotable: T,
      annotateExpression?: boolean,
    ): Promise<T>;
    annotateSemgrex<T extends simple.Annotable>(
      annotable: T,
      annotateExpression?: boolean,
    ): Promise<T>;
    annotateTregex<T extends simple.Annotable>(
      annotable: T,
      annotateExpression?: boolean,
    ): Promise<T>;
  }

  class Service {
    constructor(connector: ConnectorServer | ConnectorCLI, language?: string);
    getAnnotationData(
      text: string,
      annotations: simple.Annotator[],
      options?: { [key: string]: string | number | boolean }
    ): Promise<unknown>;
    getTokensRegexData(
      text: string,
      pattern: string,
      annotations: simple.Annotator[],
      options?: { [key: string]: string | number | boolean }
    ): Promise<unknown>;
    getSemgrexData(
      text: string,
      pattern: string,
      annotations: simple.Annotator[],
      options?: { [key: string]: string | number | boolean }
    ): Promise<unknown>;
    static getTokenPosInfo(post: string, languageISO: string): PosInfo;
    static getSentenceParseInfo(group: string, languageISO: string): SentenceParseInfo;
    static getGovernorDepInfo(dep: string): DepInfo;
  }

  class ConnectorCLI {
    get(
      config: {
        annotators: simple.Annotator[],
        text: string,
      }
    ): Promise<unknown>;
  }

  class ConnectorServer {
    get(
      config: {
        annotators: simple.Annotator[],
        text: string,
        options: { [key: string]: string | number | boolean },
        language: string,
        utility?: string,
      }
    ): Promise<unknown>;
  }

  interface DocumentJSON {
    index: number;
    sentences?: SentenceJSON[];
    corefs?: CorefMentionJSON[][];
  }

  interface CorefMentionJSON {
    id: number;
    text: string;
    sentNum: number;
    headIndex: number;
    startIndex: number;
    endIndex: number;
    isRepresentativeMention: boolean;
    animacy: CorefAnimacy;
    gender: CorefGender;
    number: CorefNumber;
    type: CorefType;
    position: [number, number];
  }

  interface ExpressionJSON {
    index: number;
    sentences: ExpressionSentenceMatchJSON[][]
  }

  interface ExpressionSentenceMatchJSON {
    begin: number;
    end: number;
    text: string;
    $label?: string;
  }

  interface ExpressionSentenceMatchGroup {
    label: string;
    begin: number;
    end: number;
    token?: TokenJSON;
    $label?: ExpressionSentenceMatchGroup;
  }

  interface GovernorJSON {
    dep: string;
    governor: number;
    governorGloss: string;
    dependent: number;
    dependentGloss: string;
  }

  interface PosInfo {
    group: string;
    tag: string;
    examples: string[];
  }

  interface DepInfo {
    type: string;
    description: string;
    examples: string[];
  }

  interface SentenceParseInfo {
    description: string;
    examples: string[];
  }

  interface TokenJSON {
    index: number;
    word: string;
    originalText: string;
    characterOffsetBegin: number;
    characterOffsetEnd: number;
    before: string;
    after: string;
    pos: string;
    lemma: string;
    ner: string;
    speaker: string;
  }

  interface SentenceJSON {
    index: number;
    tokens: TokenJSON[];
    basicDependencies?: GovernorJSON[];
    enhancedDependencies?: GovernorJSON[];
    enhancedPlusPlusDependencies?: GovernorJSON[];
    parse?: string;
  }

  namespace simple {
    class Document extends Annotable {
      constructor(text: string);
      fromJSON(data: DocumentJSON): Document;
      toString(): string;
      sentences(): Sentence[];
      corefs(): CorefChain[];
      coref(index: number): CorefChain;
      setLanguageISO(iso: string): void;
      toJSON(): DocumentJSON;
      static fromJSON(data: DocumentJSON): Document;
    }

    class Sentence {
      constructor(text: string);
      toString(): string;
      index(): number;
      parse(): string;
      words(): string[];
      word(index: number): string;
      [Symbol.iterator](): Token[];
      posTags(): string[];
      posTag(index: number): string;
      lemmas(): string[];
      lemma(index: number): string;
      nerTags(): string[];
      nerTag(index: number): string;
      governors(): Governor[];
      governor(index: number): Governor;
      tokens(): Token[];
      token(index: number): Token;
      setLanguageISO(iso: string): void;
      toJSON(): SentenceJSON
      fromJSON(data: SentenceJSON, isSentence: true): Sentence;
      fromJSON(data: DocumentJSON, isSentence: false | undefined): Sentence;
      static fromJSON(data: SentenceJSON, isSentence: true): Sentence;
      static fromJSON(data: DocumentJSON, isSentence: false | undefined): Sentence;
    }

    class Governor {
      constructor(dep: string, dependentToken: Token, governorToken: Token);
      toString(): string;
      governor(): Token;
      governorGloss(): string;
      dependent(): Token;
      dependentGloss(): string;
      dep(): string;
      depInfo(): DepInfo;
      toJSON(): GovernorJSON;
    }

    class Token {
      constructor(word: string);
      toString(): string;
      index(): number;
      word(): string;
      originalText(): string;
      characterOffsetBegin(): number;
      characterOffsetEnd(): number;
      before(): string;
      after(): string;
      lemma(): string;
      pos(): string;
      posInfo(): PosInfo;
      ner(): string;
      speaker(): string;
      toJSON(): TokenJSON;
      static fromJSON(data: TokenJSON): Token;
    }

    class Annotator {
      constructor(
        name: string,
        options: { [key: string]: string | boolean },
        dependencies: Annotator[],
      );
      toString(): string;
      equalsTo(annotator: Annotator): boolean;
      options(): { [key: string]: string | boolean };
      option(key: string, value?: string | boolean): string | boolean;
      dependencies(): Annotator[];
      pipeline(): string[];
      pipelineOptions: { [key: string]: string | boolean };
    }

    class Annotable {
      constructor(text: string);
      text(): string;
      setLanguageISO(iso: string): void;
      getLanguageISO(): string;
      addAnnotator(annotator: Annotator): void;
      removeAnnotator(annotator: Annotator): void;
      hasAnnotator(annotator: Annotator): boolean;
      hasAnyAnnotator(annotators: Annotator[]): boolean;
    }

    class Expression {
      constructor(text: string, pattern: string);
      toString(): string;
      pattern(): string;
      sentences(): ExpressionSentence[];
      sentence(index: number): ExpressionSentence;
      mergeTokensFromDocument(document: Document): Expression;
      fromJSON(data: ExpressionJSON): Expression;
      toJSON(): ExpressionJSON;
      static fromJSON(data: ExpressionJSON): Expression;
    }

    class ExpressionSentence {
      constructor(matches: ExpressionSentenceMatch[]);
      matches(): ExpressionSentenceMatch[];
      match(index: number): ExpressionSentenceMatch;
      mergeTokensFromSentence(sentence: Sentence): ExpressionSentence;
      fromJSON(data: ExpressionSentenceMatchJSON[]): ExpressionSentence;
      // toJSON seems to be improperly implemented - should return ExpressionSentenceMatchJSON[]
      toJSON(): ExpressionSentenceMatch[];
      static fromJSON(data: ExpressionSentenceMatchJSON[]): ExpressionSentence;
    }

    class ExpressionSentenceMatch {
      groups(): ExpressionSentenceMatchGroup[];
      group(label: string): ExpressionSentenceMatchGroup;
      labels(): string[];
      fromJSON(data: ExpressionSentenceMatchJSON): ExpressionSentenceMatch;
      toJSON(): ExpressionSentenceMatchJSON;
      static fromJSON(data: ExpressionSentenceMatchJSON): ExpressionSentenceMatch;
    }

    class Node {
      constructor(pos?: string, word?: string, children?: Node[], parent?: Node);
      pos(): string;
      posInfo(): SentenceParseInfo | PosInfo;
      token(): Token;
      word(): string;
      setLanguageISO(iso: string): void;
      getLanguageISO(): string;
      children(): Node[];
      appendChild(node: Node): void;
      parent(parent?: Node): Node;
      // not breaking out this type because there are errors/references to other simple types.
      toJSON(): {
        pos: string;
        posInfo: PosInfo;
        word: string;
        // this seems to be an error in the function - should return TokenJSON
        token: Token;
        // this seems to be an error in the function - should return NodeJSON[];
        children: Node[];
      }
    }

    class Tree {
      constructor(node: Node);
      dump(): string;
      visitDeepFirst(visitor: (node: Node) => void, node?: Node): void;
      visitDeepFirstRight(visitor: (node: Node) => void, node?: Node): void;
      visitLeaves(visitor: (node: Node) => void, node?: Node): void;
      static fromSentence(sentence: Sentence, doubleLink?: boolean): Tree;
      static fromString(str: string, doubleLink?: boolean): Tree;
    }

    class CorefMention {
      constructor();
      id(): string;
      text(): string;
      sentNum(): number;
      headIndex(): number;
      startIndex(): number;
      endIndex(): number;
      isRepresentativeMention(): boolean;
      animacy(): CorefAnimacy;
      gender(): CorefGender;
      number(): CorefNumber;
      type(): CorefType;
      sentence(sentence?: Sentence): Sentence;
      token(token?: Token): Token;
      fromJSON(data: CorefMentionJSON): CorefMention;
      toJSON(): CorefMentionJSON;
      static fromJSON(data: CorefMentionJSON): CorefMention;
    }

    class CorefChain {
      constructor(mentions: CorefMention[]);
      mentions(): CorefMention[];
      mention(index: number): CorefMention;
      representative(): CorefMention;
      nonRepresentatives(): CorefMention[];
      document(doc?: Document): Document;
      fromDocument(doc: Document): CorefChain;
      fromJSON(data: CorefMention[]): CorefChain;
      toJSON(): CorefMention[];
      static fromJSON(data: CorefMention[]): CorefChain;
    }
  }
}

declare module 'corenlp' {
  export = CoreNLP;
}
