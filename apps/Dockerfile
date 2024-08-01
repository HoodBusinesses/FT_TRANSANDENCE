FROM node:18

WORKDIR /app

COPY ../pnpm-lock.yaml ../pnpm-workspace.yaml ../package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
