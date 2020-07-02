MODULE_NAME=$1

CAMEL_CASE_NAME=`echo $MODULE_NAME | gsed -r "s/-(.)/\U\1/g" | gsed -r 's/.*/\u&/'`

cd "$(dirname "$0")"
cd ../

nest generate module $MODULE_NAME

cd src/$MODULE_NAME

mv ${MODULE_NAME}.module.ts ${CAMEL_CASE_NAME}Module.ts

mkdir controller
mkdir dto
mkdir filter
mkdir model
mkdir service