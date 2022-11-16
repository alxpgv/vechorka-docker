FROM nginx:1.23.1-alpine
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]