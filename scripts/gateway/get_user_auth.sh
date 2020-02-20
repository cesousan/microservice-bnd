#!/bin/bash
USER_ID=${1:-''}
TOKEN=${2:-''}
GET_USER_ADDR=http://localhost:8080/user

if [[ -z "$USER_ID" ]]
then
    echo "fetching all users"
else
    echo "fetching user with id $USER_ID"
    GET_USER_ADDR=$GET_USER_ADDR/$USER_ID
fi

echo $GET_USER_ADDR

curl -i \
-H 'Accept: application/json' \
-H "Authorization: Bearer ${TOKEN}" \
$GET_USER_ADDR