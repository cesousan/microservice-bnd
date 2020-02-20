#!/bin/bash
FIRST_NAME=John
LAST_NAME=Doe
PASSWORD=secretPwd
USERNAME=''
EMAIL=''
LOCATION=Paris

while getopts ":f:l:u:e:p:L:" opt; do
  echo $opt $OPTARG
  case $opt in
    f) FIRST_NAME="$OPTARG"
    ;;
    l) LAST_NAME="$OPTARG"
    ;;
    u) USERNAME="$OPTARG"
    ;;
    e) EMAIL="$OPTARG"
    ;;
    p) PASSWORD="$OPTARG"
    ;;
    L) LOCATION="$OPTARG"
    ;;
  esac
done

if [[ -z "$USERNAME" ]]
then
  USERNAME=$FIRST_NAME$LAST_NAME
fi

if [[ -z "$EMAIL" ]]
then
  EMAIL=$FIRST_NAME.$LAST_NAME@mail.com
fi



echo {"firstname":"'$FIRST_NAME'", "lastname": "'$LAST_NAME'", "username": "'$USERNAME'", "password": "'$PASSWORD'", "email":"'$EMAIL'", "location":"'$LOCATION'"}

curl -i -X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
--data '{"firstname":"'$FIRST_NAME'", "lastname": "'$LAST_NAME'", "username": "'$USERNAME'", "password": "'$PASSWORD'", "email":"'$EMAIL'", "location":"'$LOCATION'"}' \
http://localhost:8080/user


# -user:u:-password:p:-email:e:-location:loc: