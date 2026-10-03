FROM node:20-alpine

WORKDIR /app
COPY dist dist
COPY node_modules node_modules

ENTRYPOINT ["node", "dist/main"]
