# Use the official Couchbase server image
FROM couchbase/server:enterprise-7.2.0

# Expose the necessary ports
EXPOSE 8091 8092 8093 8094 8095 18091 11210

# Create a directory for data storage
RUN mkdir -p /opt/couchbase/data

# Copy initialization script
COPY init-couchbase.sh /opt/couchbase

# Set execute permissions on the script
RUN chmod +x /opt/couchbase/init-couchbase.sh

# Command to start Couchbase and run initialization script
CMD ["/opt/couchbase/init-couchbase.sh"]
