#!/bin/bash
USERNAME=${1:-JohnDoe}
PASSWORD=${2:-secret}

curl -i -X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
--data '{"username":"'$USERNAME'","password":"'$PASSWORD'"}' \
http://localhost:8080/auth/login
