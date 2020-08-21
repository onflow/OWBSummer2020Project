# alley-oop

Minimum Automated Market Maker(AMM) on Flow Blockchain

![](https://media.giphy.com/media/l0HlTgeWIqq5wZMKA/giphy-downsized.gif)

## A quick summary

Alley-oop is a decentralised exchange which allows you to swap tokens based on the price calculated by smartcontract without counter party.

- [Youtube video](https://www.youtube.com/watch?v=TRjy-rEirIo)
- [Google Slide](https://docs.google.com/presentation/d/1X3lBUxAib1h2toi979tlVaSrqDdALxItqXvX5e6MZso/edit?usp=sharing)

## Flow playground

- [Flow playground](https://play.onflow.org/ac8f1629-2f92-4559-b456-1b5401eab111)

## How to run the demo on the Flow playground

- Deploy FlowToken as the first(0x01) account
- Deploy BaloonToken as the second(0x02) account
- Deploy Dex as the third(0x03) account
- Run Transaction1.cdc with all accounts
- Run Transaction2.cdc with all accounts
- Run Transaction2.cdc with the first account(0x01)
- Run Script1.cdc to run report

## How to run locally

### Initialisation

```
go mod init alley-oop
```

### Start up server

Run each command in the different tab

```
flow emulator start -v
```

```
yarn dev-wallet
```


```
go run run.go
```

```
yarn start
```

After the frontend server is up, open the browser at https://localhost:3000


## Current limitation and potential future addtion

### Limitations

- For the demo purpose, both tokens allow anyone to mint token which needs to be removed for production use.
- The front-end chart is the fork of [Minimum viable exchange](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90) tutorial post by Austin Griffith. The curve was mostly there for educational purpose and should be taken out for production use.
- At source code level, Basketball token are named Baloon token following the example of the Minimum viable exchange

### Future additions

- Ability for anyone to add a pool
- Ability to list any token
- Ability to mint new token to allow crowd sale
- Ability to list non fungible tokens as well as fungible tokens
