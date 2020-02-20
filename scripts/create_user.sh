#!/bin/bash
FIRST_NAME=${1:-John}
LAST_NAME=${2:-Doe}
USERNAME=$FIRST_NAME$LAST_NAME
PASSWORD=${3:-secretPwd}
EMAIL="$FIRST_NAME.$LAST_NAME@mail.com"
LOCATION=${4:-Paris}


echo ${FIRST_NAME}
echo ${LAST_NAME}
echo ${LOCATION}

echo {"firstname":"'$FIRST_NAME'", "lastname": "'$LAST_NAME'", "username": "'$USERNAME'", "password": "'$PASSWORD'", "email":"'$EMAIL'", "location":"'$LOCATION'"}

curl -i -X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
--data '{"firstname":"'$FIRST_NAME'", "lastname": "'$LAST_NAME'", "username": "'$USERNAME'", "password": "'$PASSWORD'", "email":"'$EMAIL'", "location":"'$LOCATION'"}' \
http://localhost:5000/user