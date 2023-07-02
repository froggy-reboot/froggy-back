FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

## STEP 1
## 1
#FROM node:18 AS builder
## 2
#WORKDIR /app
## 3
#COPY . .
## 4
#RUN npm i
## 5
#RUN npm run build
#
## STEP 2
##6
#FROM node:18-alpine
##7
#WORKDIR /app
##8
#ENV NODE_ENV production
##9
#COPY --from=builder /app ./
##10
#CMD ["yarn","start:prod"]