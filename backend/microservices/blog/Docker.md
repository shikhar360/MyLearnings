### Docker Commands
docker run - Run a container from an image
docker pull - Pull an image from a registry
docker push - Push an image to a registry
docker ps - List running containers
docker images - List all available images
docker stop - Stop a running container
docker rm - Remove a stopped container
docker rmi - Remove an image
docker exec - Run a command inside a running container
docker network ls - List all available networks
docker network create - Create a new network
docker network connect - Connect a container to a network
docker network disconnect - Disconnect a container from a network
docker-compose up - Start containers defined in a Compose file
docker-compose down - Stop containers defined in a Compose file

Managing Docker Images
docker pull: Pull an image from a registry
docker push: Push an image to a registry
docker rmi: Remove an image
docker inspect: Display detailed information about an image
docker tag: Tag an image with a name and/or a version


Managing Docker Registry
docker login: Log in to a Docker registry
docker logout: Log out from a Docker registry
docker search: Search for an image in a Docker registry
docker history: Show the history of an image
docker save: Save an image to a tar archive
docker load: Load an image from a tar archive


Docker System Commands
docker system df: Show disk usage of all Docker components
docker system prune: Remove unused data (e.g., stopped containers, unused images)
docker system events: Show Docker events such as containers starting/stopping, images being pulled/pushed

Docker Swarm Commands
docker swarm init: Initialize a Docker swarm
docker swarm join: Join a Docker swarm
docker swarm leave: Leave a Docker swarm
docker service: Manage Docker services in a swarm
docker stack: Deploy an application stack to a swarm
