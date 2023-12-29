#!/bin/bash

# Function to check if the cluster is initialized
isClusterInitialized() {
  couchbase-cli server-list -c localhost:8091 -u tyadmin -p typassword &> /dev/null
  return $?
}

# Function to check if a bucket exists
doesBucketExist() {
  couchbase-cli bucket-list -c localhost:8091 -u tyadmin -p typassword | grep -q "$1"
  return $?
}

# Start Couchbase Server
/entrypoint.sh couchbase-server &

# Wait for Couchbase Server to be up
until curl -s http://localhost:8091/ui/index.html > /dev/null; do
  echo "Waiting for Couchbase Server to start..."
  sleep 1
done

# Initialize cluster only if not already initialized
if ! isClusterInitialized; then
  couchbase-cli cluster-init \
    --cluster-username tyadmin \
    --cluster-password typassword \
    --services data,index,query,fts,eventing,analytics \
    --cluster-ramsize 1024 \
    --cluster-index-ramsize 512 \
    --cluster-eventing-ramsize 256 \
    --cluster-analytics-ramsize 1024 \
    --index-storage-setting default
fi

# Create the bucket only if it doesn't exist
if ! doesBucketExist "database"; then
  couchbase-cli bucket-create \
    --cluster localhost:8091 \
    --username tyadmin \
    --password typassword \
    --bucket database \
    --bucket-type couchbase \
    --bucket-ramsize 512
fi

# Add additional setup steps here, such as creating scopes and collections

# Wait indefinitely to keep the container running
tail -f /dev/null
