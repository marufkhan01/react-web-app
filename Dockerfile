FROM node:latest
RUN apt-get update && apt-get install -y awscli
COPY package.json .
RUN npm install
COPY public public
COPY src src
RUN node_modules/.bin/react-scripts build
WORKDIR build
ENV AWS_ACCESS_KEY_ID AKIAILKNAAXNQFP53UDA
ENV AWS_SECRET_ACCESS_KEY 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
RUN aws s3 rm s3://adminplatformfrontend --recursive
RUN aws s3 sync . s3://adminplatformfrontend
