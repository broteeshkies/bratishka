NODE_ENV=production yarn run build &&
cd ./build &&
NODE_ENV=production yarn &&
cd .. &&
rsync -avz ./build/* s3:/projects/bratishka/app &&
ssh s3 'cd /projects/bratishka && docker-compose stop && docker-compose up' &&
echo 'ok'
