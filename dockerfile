FROM ubuntu:18.04

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y dnsutils
RUN apt-get install -y build-essential libssl-dev

RUN mkdir /usr/local/nvm

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.15.5

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN mkdir acesso-adm

COPY . /acesso-adm

WORKDIR /acesso-adm

RUN npm install

EXPOSE 3000
CMD npm start