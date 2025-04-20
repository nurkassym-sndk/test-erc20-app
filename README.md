<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```


# This backend application is designed for interacting with an [ERC-20](https://www.cyfrin.io/glossary/erc-20-solidity-code-example) token smart contract

The application provides core token functionalities such as **checking balances, transferring tokens, minting, approving, burn and more**. The service is built using [NestJS](https://nestjs.com/) and [Viem](https://viem.sh/)

## API Documentation

**Documentation for all requests** (including examples and schemas) is available via **Swagger**:
```typescript
GET /docs
```

___

Configuration Settings
The following settings must be defined in the *.env file*:

> An example of all environment variables is also available in the **.env.sample** file

```bash
MODE=DEV
ENVIRONMENT=dev

PORT=3000           # API port
DOCS_PATH           # API docs

CHAIN_ID=11155111      # Chain id  
RPC_URL=https://sepolia.drpc.org    # RPC URL
CONTRACT_ADDRESS=0x05e9A91A2B72E1cD576503d565F1112f6d025bb0   # Deployed contract

OPERATOR_ADDRESS=YOUR_WALLET_PUBLIC_KEY      # Opeartor wallet address
OPERATOR_ADDRESS_PK=YOUR_WALLET_PRIVATE_KEY  # Opeartor private key
```

## Docker Deployment

Each microservice has its own **`Dockerfile`**.

To start the application in Docker, run the following command in the project’s root directory:
```bash
docker compose up -d
```

Once the command executes successfully, the application will be fully deployed and ready for testing.

> By default, the API will be accessible on port 3000.