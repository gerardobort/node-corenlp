FROM nlpbox/corenlp

WORKDIR /opt/corenlp

ADD examples examples
RUN chmod +x examples/browser/server.sh
RUN apk update && apk add python3

ENV JAVA_XMX 4g
ENV PORT 9000
EXPOSE $PORT
EXPOSE 8000

CMD cd examples/browser && ./server.sh && cd - && java -Xmx$JAVA_XMX -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -port 9000 -timeout 15000
