FROM node:14-alpine AS base
WORKDIR /app

ARG VERSION=1.0.0
ENV VERSION=$VERSION
ENV REACT_APP_VERSION=$VERSION

ARG STAGE=local
ENV STAGE=$STAGE
ENV REACT_APP_STAGE=$STAGE

FROM base AS build
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn lint
RUN yarn build

FROM base AS final
COPY --from=build ["/app/package.json", "/app/yarn.lock", "./"]
COPY --from=build ["/app/dist/", "./dist/"]
COPY --from=build ["/app/build/", "./build/"]
RUN yarn install --frozen-lockfile --production

EXPOSE 3001
CMD ["yarn", "serve"]
