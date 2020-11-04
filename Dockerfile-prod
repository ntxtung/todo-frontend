FROM node:12

WORKDIR /home/xt/todos

COPY . .

RUN yarn install
RUN yarn build --prod

EXPOSE 5000

CMD ["./node_modules/.bin/serve", "./dist/todo-frontend/"]
