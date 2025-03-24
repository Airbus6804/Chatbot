FROM nikolaik/python-nodejs:latest
WORKDIR /usr/app
COPY requirements.txt .
COPY install.sh .
RUN sh /usr/app/install.sh
CMD ["nodemon", "-L"]

