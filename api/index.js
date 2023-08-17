//*                       _oo0oo_
//*                      o8888888o
//*                      88" . "88
//*                      (| -_- |)
//*                      0\  =  /0
//*                    ___/`---'\___
//*                  .' \\|     |// '.
//*                 / \\|||  :  |||// \
//*                / _||||| -:- |||||- \
//*               |   | \\\  -  /// |   |
//*               | \_|  ''\---/''  |_/ |
//*               \  .-\__  '-'  ___/-. /
//*             ___'. .'  /--.--\  `. .'___
//*          ."" '<  `.___\_<|>_/___.' >' "".
//*         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//*         \  \ `_.   \_ __\ /__ _/   .-` /  /
//*     =====`-.____`.___ \_____/___.-`___.-'=====
//*                       `=---='
//*     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const app = require("./src/app.js");
const { conn } = require("./src/db.js");

const PORT = 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
   // Nota: force:false para que no se borre la base de datos
   app.listen(3001, () => {
      console.log(`%s listening at ${PORT}`, "My server"); // eslint-disable-line no-console
   });
});
