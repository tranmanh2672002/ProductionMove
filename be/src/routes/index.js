const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const factoryRouter = require('./factoryRouter');
const agencyRouter = require('./agencyRouter');

function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/factory', factoryRouter);
    app.use('/agency', agencyRouter);

}

module.exports = route;