FROM couchbase/server:enterprise-7.2.0

# Expose the necessary ports
EXPOSE 8091 8092 8093 8094 8095 18091 11210

# Create a directory for data storage
RUN mkdir -p /opt/couchbase/data

# Command to start Couchbase
CMD ["couchbase-server"]
