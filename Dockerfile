FROM node:12

WORKDIR /home/xt/todos

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 5000

CMD ["serve", "./dist/todo-frontend/"]
