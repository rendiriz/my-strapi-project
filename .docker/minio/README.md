```
docker compose \
	-f .docker/minio/docker-compose.yml \
	--env-file .env \
	up -d
```