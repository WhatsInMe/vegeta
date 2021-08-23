#!/bin/sh

echo "killing existing node"
pkill -x node

echo "compiling typescript"
tsc

echo "sourcing environment variables"
. ./.env

echo "starting node"
node ./dist/index.js | tee node.log &

echo "waiting for node to start"
sleep 5

case $1 in
    test)

        echo "running tests"
        # unset count
        # count=0
        ls ./scripts | while read line; do
            # if [ $count -lt 2 ]; then
            #     count=$(( $count + 1 ))
            #     continue
            # fi
            echo "running $line"
            sh ./scripts/${line}
        done

        ;;
    *)

        echo "nothing here"

        ;;
esac

echo "killing"
pkill -x node

