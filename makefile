.PHONY: up
up:
	docker build -t wt-api:latest . && \
	docker run -d -p 8000:8000 wt-api:latest

.PHONY: reset
reset:
	docker system prune -a -f
	docker volume prune -f
	docker network prune -f