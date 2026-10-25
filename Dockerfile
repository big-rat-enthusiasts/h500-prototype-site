FROM node:26 AS build
WORKDIR /app

COPY . .
RUN ./scratch.sh
RUN npm ci
RUN npm run fix-code && npm run build

FROM alpine:3 AS production

ARG PB_VERSION=0.40.6
ARG TARGETARCH

RUN apk add --no-cache \
    ca-certificates \
    curl

WORKDIR /app

RUN apk add --no-cache --virtual .fetch-deps \
    unzip && \
    curl -fL -o pocketbase.zip \
    "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip" && \
    unzip pocketbase.zip pocketbase && \
    apk del .fetch-deps

COPY ./db/pb_migrations pb_migrations
COPY --from=build /app/dist pb_public

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD curl -f http://localhost:8080/api/health || exit 1

EXPOSE 8080

ENTRYPOINT ["/app/pocketbase", "serve", "--http=0.0.0.0:8080"]
