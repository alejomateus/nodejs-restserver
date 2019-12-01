process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/restserver'
} else {
    urlDB = process.env.SERVERURLDB;
}
process.env.URLDB = urlDB;