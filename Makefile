VERSION := $$(make -s show-version)
GCP_PROJECT := $(shell gcloud config get-value project)

.PHONY: show-version
show-version: $(GOBIN)/gobump
	@gobump show -r .

.PHONY: tag
tag:
	git tag -a "v$(VERSION)" -m "Release $(VERSION)"
	git push --tags

.PHONY: lint
lint:
	golint -set_exit_status ./...

.PHONY: vet
vet:
	go vet ./...

dev: ## start develop server
	yarn dev

fmt: ## format
	yarn fmt
	yarn lint

generate: ## exec after editing query
	yarn generate

open: ## open app
	gcloud app browse

deploy:
	yarn export
	gcloud app deploy -q

