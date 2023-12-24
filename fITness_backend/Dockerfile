FROM python:alpine3.16

WORKDIR /app

COPY requirements.txt /app/

RUN apk update && \
    apk add --virtual build-deps gcc python3-dev musl-dev && \
    apk add --no-cache mariadb-dev && \
    apk add netcat-openbsd

RUN pip3 install --upgrade pip && \
    pip3 install -r requirements.txt && \
    apk del build-deps

COPY . /app/
RUN chmod 755 wait-for-db.sh

ENTRYPOINT ["./wait-for-db.sh"]
