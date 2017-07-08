#!/usr/bin/env bash
wait_for_db() {
  nslookup db
  if ! nc -z db 3306; then
    echo "Waiting for db..."
    sleep 2
    wait_for_db
  fi
}

wait_for_db

cd /usr/src/app
npm test