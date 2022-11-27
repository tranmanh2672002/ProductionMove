const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const factoryRouter = require('./factoryRouter');



function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/factory', factoryRouter);

}

module.exports = route;