CURRENT_REVISION := $(shell git rev-parse --short HEAD)
VERSION := "TODO"
GCP_PROJECT := $(shell gcloud config get-value project)

.DEFAULT_GOAL := help
.PHONY: $(shell grep -E '^[a-zA-Z_-]+:' $(MAKEFILE_LIST) | sed 's/://')

help: ## Show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

tag:
	git tag -a "v$(VERSION)" -m "Release $(VERSION)"
	git push --tags

dev: ## start develop server
	yarn dev

fmt: ## format
	yarn fmt
	yarn lint

open: ## open app
	gcloud app browse

deploy: ## localでデプロイ
	yarn export
	gcloud app deploy -q

fmt-markdown: ## markdownをフォーマットする
	docker run --rm -v "$(pwd):/data" -e INPUT_CONFIG=/data/.markdownlint.yml avtodev/markdown-lint:v1 /data/contents
