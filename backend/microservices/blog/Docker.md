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

### why we use kubernetes

Kubernetes (also known as "K8s") is an open-source container orchestration platform developed by Google that automates the deployment, scaling, and management of containerized applications. It was first released in 2014 and has since become one of the most widely used container orchestration tools in the industry.

what is orchestration ??
Orchestration refers to the process of coordinating and managing multiple tasks or services to achieve a specific outcome. In the context of software and IT infrastructure, orchestration typically involves automating the deployment, configuration, and management of complex systems and applications.

Kubernetes allows users to deploy and manage containerized applications across a distributed infrastructure, such as public or private cloud environments. It provides a way to abstract the underlying infrastructure, allowing developers to focus on building and deploying applications without having to worry about the underlying infrastructure details.

Kubernetes uses a declarative approach to deployment, meaning that users define the desired state of their applications and Kubernetes works to maintain that state. This allows for automated scaling, self-healing, and rolling updates of applications.

Kubernetes also provides a rich set of features, including service discovery and load balancing, storage orchestration, automatic bin packing, and self-healing, among others. It can be run on-premises or in the cloud, and is highly extensible, with a large ecosystem of plugins and tools available.