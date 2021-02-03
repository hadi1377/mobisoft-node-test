/**
 * @author Hadi Ahmadzadeh <hadi.wf77@gmail.com>
 */

import Promise from "bluebird";
import "module-alias/register";

import config from "@config/index";
import Express from "@config/Express";
import sequelize from "@models/index";
import runInitialCommands from "@middlewares/initialCommands";
Promise.promisifyAll(sequelize);

/**
 * Initialize Express
 */
const ExpressServer = new Express();
ExpressServer.init();

sequelize
  .sync({ logging: false, force: false, alter: true })
  .then((data) => {
    runInitialCommands().then(() => {
      ExpressServer.httpServer.listen(process.env.PORT || config.port, () => {
        console.log(`🚀  Server ready at ${process.env.PORT || config.port}`);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
