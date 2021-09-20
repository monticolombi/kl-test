FROM node:15.14.0 as base
EXPOSE 3000
WORKDIR /app
COPY . .

FROM base as production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn install --frozen-lockfile --prod && \
    yarn build
CMD yarn start

FROM base as dev 
ENV NODE_ENV=development
RUN yarn install
CMD yarn docker:dev