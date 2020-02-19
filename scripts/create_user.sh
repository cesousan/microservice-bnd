#!/bin/bash
FIRST_NAME=${1:-John}
LAST_NAME=${2:-Doe}
LOCATION=${3:-Paris}

echo ${FIRST_NAME}
echo ${LAST_NAME}
echo ${LOCATION}

echo {"full_name":"'$FIRST_NAME' '$LAST_NAME'","email":"'$FIRST_NAME.$LAST_NAME@mail.com'", "location":"'$LOCATION'"}

curl -i -X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
--data '{"full_name":"'$FIRST_NAME' '$LAST_NAME'","email":"'$FIRST_NAME.$LAST_NAME@mail.com'", "location":"'$LOCATION'"}' \
http://localhost:5000/user