# default-project

## server
- express
- [validate.js](https://validatejs.org/)
- [Sequelize](http://docs.sequelizejs.com/)
- log4js
- multer

## client
- angularJS
- ng-file-upload

## build
- webpack
- babel
- sass

## ready
`npm i -g webpack babel-cli`

## script
```
# stop
sudo /etc/init.d/nginx stop
forever stop 0

# build
git pull
npm install
rm -rf build
webpack
babel server --out-dir build

# run
forever start build/server
sudo /etc/init.d/nginx start
```