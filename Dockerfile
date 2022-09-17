FROM node:16-alpine
WORKDIR /chawk-admin
COPY . . 
RUN npm run build
CMD ["npm","start"]