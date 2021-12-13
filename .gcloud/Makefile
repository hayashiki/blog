CURRENT_REVISION = $(shell git rev-parse --short HEAD)
GCP_PROJECT = $(shell gcloud config get-value project)
GCP_PROJECT_NUMBER=$(shell gcloud projects describe ${GCP_PROJECT} --format="get(projectNumber)")
POOL_NAME = github-actions
WORKLOAD_IDENTITY_POOL_ID=$(shell gcloud iam workload-identity-pools describe "${POOL_NAME}" --project="${GCP_PROJECT}" --location="global" --format="value(name)")
GITHUB_REPO=hayashiki/blog # コレでいけそう？ git config remote.origin.url | cut -d : -f 2 | sed 's/.git//'
PROVIDER_NAME=gha-provider
CI_SA_EMAIL = "ci-user@${GCP_PROJECT}.iam.gserviceaccount.com"
CLOUDBUILD_SA=${GCP_PROJECT_NUMBER}@cloudbuild.gserviceaccount.com
BUILD_DATE  := $(shell date +%FT%T%z)

SERVICE_NAME := oimonotes-node
CLOUDRUN_SA=${SERVICE_NAME}@${GCP_PROJECT}.iam.gserviceaccount.com

.DEFAULT_GOAL := help
.PHONY: *

help: ## Show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

########################
### base             ###
########################

enable: ## APIを有効化する
	gcloud services enable iamcredentials.googleapis.com --project ${GCP_PROJECT} # for WorkloadIdentify
	gcloud services enable appengine.googleapis.com --project ${GCP_PROJECT} # for GAE
	gcloud services enable run.googleapis.com --project ${GCP_PROJECT} # for Run


########################
### CI Service role  ###
########################

create-ci-sa: ## CIユーザを作成する
	gcloud iam service-accounts create "ci-user" \
		--project=${GCP_PROJECT} \
		--display-name "CI User Service Account"

binding: ## CIユーザにデプロイに必要な権限を付与する
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
	  --member="serviceAccount:${CI_SA_EMAIL}" \
	  --role='roles/compute.storageAdmin'
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
	  --member="serviceAccount:${CI_SA_EMAIL}" \
	  --role='roles/cloudbuild.builds.editor'
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
	  --member="serviceAccount:${CI_SA_EMAIL}" \
	  --role='roles/appengine.deployer'
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
	  --member="serviceAccount:${CI_SA_EMAIL}" \
	  --role='roles/appengine.appAdmin'
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
	  --member="serviceAccount:${CI_SA_EMAIL}" \
	  --role='roles/cloudbuild.builds.builder'
	gcloud iam service-accounts add-iam-policy-binding ${GCP_PROJECT}@appspot.gserviceaccount.com \
	  --member="serviceAccount:${CI_SA_EMAIL}" \
	  --role='roles/iam.serviceAccountUser'

########################
### WorkloadIdentify ###
########################
create_pool: ## ワークロード連携プールを作成する
	gcloud iam workload-identity-pools create ${POOL_NAME} \
		--project=${GCP_PROJECT} --location="global" \
		--display-name="use from GitHub Actions"

show_pool_id: ## ワークロード連携のプールIDを確認する
	echo $(WORKLOAD_IDENTITY_POOL_ID)
	# gcloud iam workload-identity-pools describe "github-actions" --project ${GCP_PROJECT} --location="global" --format="value(name)"

create-policy: ## CIユーザにロールを付与する
	gcloud iam service-accounts add-iam-policy-binding ${CI_SA_EMAIL} \
	--project="${GCP_PROJECT}" \
	--role="roles/iam.workloadIdentityUser" \
	--member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${GITHUB_REPO}"


create-provider: ## PoolにProviderを作成する
	gcloud iam workload-identity-pools providers create-oidc "${PROVIDER_NAME}" \
	--project="${GCP_PROJECT}" --location="global" \
	--workload-identity-pool="${POOL_NAME}" \
	--display-name="use from GitHub Actions provider" \
	--attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.actor=assertion.actor,attribute.aud=assertion.aud" \
	--issuer-uri="https://token.actions.githubusercontent.com"


########################
### Cloud Run        ###
########################
create-run-invoker-sa:
	gcloud iam service-accounts create $(SERVICE_NAME) \
		--display-name "$(SERVICE_NAME) service account"

grant-role-sa:
# not need...
	gcloud iam service-accounts add-iam-policy-binding \
	  ${GCP_PROJECT_NUMBER}-compute@developer.gserviceaccount.com \
	  --member serviceAccount:${CLOUDRUN_SA} \
	  --role="roles/iam.serviceAccountUser"
	gcloud iam service-accounts add-iam-policy-binding ${CLOUDRUN_SA} \
	  --member "serviceAccount:${CLOUDBUILD_SA}" \
	  --role "roles/iam.serviceAccountUser"
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
		--member serviceAccount:${CLOUDBUILD_SA} \
		--role roles/run.admin
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
	  --member="serviceAccount:${CLOUDBUILD_SA}" \
	  --role='roles/run.admin'
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
	  --member="serviceAccount:${CLOUDBUILD_SA}" \
	  --role='roles/cloudbuild.builds.builder'
	gcloud iam service-accounts add-iam-policy-binding ${GCP_PROJECT_NUMBER}-compute@developer.gserviceaccount.com \
	  --member="serviceAccount:${CLOUDBUILD_SA}" \
	  --role='roles/iam.serviceAccountUser'
	gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
	  --member "serviceAccount:${GCP_PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
	  --role roles/run.admin
	gcloud iam service-accounts add-iam-policy-binding \
	  $GC_PROJECT_NUMBER-compute@developer.gserviceaccount.com \
	  --member="serviceAccount:${GCP_PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
	  --role="roles/iam.serviceAccountUser"

