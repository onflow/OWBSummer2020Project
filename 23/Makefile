all: run-demo

.PHONY: run-demo
run-demo:
		go run ./run/demo/main.go

.PHONY: deploy-contracts
deploy-contracts:
		go run ./run/setup/deploy/main.go

.PHONY: setup-auction-account
setup-auction-account:
		go run ./run/setup/accounts/auction/main.go

.PHONY: setup-bidder-accounts
setup-bidder-accounts:
		go run ./run/setup/accounts/bidders/main.go

.PHONY: mint-rocks
mint-rocks:
		go run ./run/setup/mint/nft/main.go

.PHONY: mint-demotokens
mint-demotokens:
		go run ./run/setup/mint/ft/main.go

.PHONY: create-auction
create-auction:
		go run ./run/auction/create/main.go

.PHONY: place-bids
place-bids:
		go run ./run/auction/bid/main.go

.PHONY: advance-auction
advance-auction:
		go run ./run/auction/settle/advance/main.go

.PHONY: payout-orbs
payout-orbs:
		go run ./run/auction/settle/payout/main.go

.PHONY: check-epoch
check-epoch:
		go run ./run/auction/check/epoch/main.go

.PHONY: check-active-bidders
check-active-bidders:
		go run ./run/auction/check/bidders/main.go

.PHONY: check-bidder-accounts
check-bidder-accounts:
		go run ./run/auction/check/bidder_accounts/main.go

.PHONY: check-orbs
check-orbs:
		go run ./run/auction/check/orbs/main.go