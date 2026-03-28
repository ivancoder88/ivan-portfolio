FROM node:24.14.1 AS builder

WORKDIR /app

ENV NG_CLI_ANALYTICS=false
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm
RUN pnpm add --global @angular/cli

COPY . /app/

RUN pnpm install
RUN pnpm run build

FROM node:24.14.1

WORKDIR /app

COPY --from=builder /app/dist/ivan-portfolio /app/

EXPOSE 4000

CMD [ "node", "server/server.mjs" ]