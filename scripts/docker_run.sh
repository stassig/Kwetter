# TODO: Implement container checking and cleanup
# make runnable script
chmod +x docker_run.sh
# run script
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# run docker-compose
docker-compose -f docker-compose.yml up -d


