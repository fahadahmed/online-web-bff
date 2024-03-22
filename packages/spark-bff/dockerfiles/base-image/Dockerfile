FROM node:16

#Certificate
ENV BASE_CERT_PATH=packages/spark-bff/dockerfiles/base-image/spark-root-ca1.pem
ENV CERT_HOME=/usr/local/share/ca-certificates
ENV CERT_FILE_PATH=${CERT_HOME}/spark-root-ca1.pem

RUN mkdir -p ${CERT_HOME}
ADD ${BASE_CERT_PATH} ${CERT_FILE_PATH}

ENV http_proxy=http://proxy.telecom.tcnz.net:80
ENV https_proxy=http://proxy.telecom.tcnz.net:80
ENV no_proxy=.telecom.tcnz.net,.spark.co.nz


