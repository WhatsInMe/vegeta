#!/bin/sh

. ../.env

#^ register

echo
echo "================================================================================"
curl --location --request POST "http://localhost:${PORT}/accounts" \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "kevinjames@gmail.com",
        "password": "pass"
    }' | jq '.'

#$

#^ login

echo
echo "================================================================================"
responseFile=$(mktemp /tmp/XXXXXXXXXX)
curl --location --request POST "http://localhost:${PORT}/login" \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "kevinjames@gmail.com",
        "password": "pass"
    }' | tee $responseFile | jq '.'

token=$(jq -r '.token' $responseFile)

#$

#^ access

echo
echo "================================================================================"
curl --location --request GET "http://localhost:${PORT}/accounts/1" \
    --header "x-access-token: ${token}" | jq '.'

#$

# vim: fdm=marker fmr=#^,#$
