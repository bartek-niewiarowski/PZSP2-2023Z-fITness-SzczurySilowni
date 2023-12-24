#!/bin/sh

while ! nc -z pzsp2-db 3306 ; do
  echo "waiting for db"
  sleep 3
done

python3 manage.py runserver 0.0.0.0:8000