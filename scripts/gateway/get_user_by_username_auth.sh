#!/bin/bash
USER_USERNAME=''
TOKEN=''
GET_USER_ADDR=http://localhost:8080/user/name

while getopts ":n:t:" opt; do
  echo $opt $OPTARG
  case $opt in
    n) USER_USERNAME="$OPTARG"
    ;;
    t) TOKEN="$OPTARG"
    ;;
  esac
done

if [[ -z "$USER_USERNAME" ]]
then
    echo "no name provided --> must provide a username!"
else
    echo "fetching user: $USER_USERNAME"
    GET_USER_ADDR=$GET_USER_ADDR/$USER_USERNAME

    echo $GET_USER_ADDR

    curl -i \
    -H 'Accept: application/json' \
    -H "Authorization: Bearer ${TOKEN}" \
    $GET_USER_ADDR
fi
