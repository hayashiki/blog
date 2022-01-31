CURRENT_REVISION := $(shell git rev-parse --short HEAD)
VERSION := "TODO"
GCP_PROJECT := $(shell gcloud config get-value project)
SERVICE_NAME := oimonotes-node

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

fb-deploy:
	yarn export
	firebase deploy

run-build:
	gcloud builds submit --tag gcr.io/$(GCP_PROJECT)/$(SERVICE)

run-deploy:
	docker build -t ${SERVICE_NAME} .
	docker tag SERVICE_NAME gcr.io/${GCP_PROJECT}/${SERVICE_NAME}:latest # github.shaとかコミットハッシュつけたほうがよい
	docker push gcr.io/${GCP_PROJECT}/${SERVICE_NAME}:latest # github.shaとかコミットハッシュつけたほうがよい
	gcloud run deploy $(SERVICE_NAME) --image gcr.io/$(GCP_PROJECT)/$(SERVICE_NAME) --platform managed --region asia-northeast1
