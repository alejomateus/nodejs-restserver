process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/restserver'
} else {
    urlDB = 'mongodb+srv://alejandro:AGL2Iz9LF7TFFXeY@cluster0-jiaha.mongodb.net/restserver';
}
process.env.URLDB = urlDB;