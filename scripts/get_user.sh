#!/bin/bash
USER_ID=${1:-''}
GET_USER_ADDR=http://localhost:5000/user
if [[ -z "$USER_ID" ]]
then
    echo "fetching all users"
else
    echo "fetching user with id $USER_ID"
    GET_USER_ADDR=$GET_USER_ADDR/$USER_ID
fi

echo $GET_USER_ADDR

curl -i $GET_USER_ADDR