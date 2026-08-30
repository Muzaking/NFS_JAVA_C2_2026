# Day 17 Exercise 08 - Docker Secrets and Run Evidence

## Docker Run Command
```bash
docker run --rm --name support-desk-api-day17 \
  --env-file .env \
  -e SPRING_PROFILES_ACTIVE=docker \
  -p 8080:8080 \
  support-desk-api:day17