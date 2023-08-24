FROM node:16

WORKDIR /build
COPY . .
RUN npm install --force && npm run build_develop

FROM nginx:latest
COPY --from=0 /build/config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /build/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
