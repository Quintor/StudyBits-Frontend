FROM node:8.11.1

RUN npm install -g @angular/cli  -unsafe-perm

RUN mkdir /app/

WORKDIR /app/

ADD package.json package-lock.json /app/

RUN npm install

ADD . .

CMD ng serve

