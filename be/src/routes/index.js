const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const factoryRouter = require('./factoryRouter');
const agencyRouter = require('./agencyRouter');
const deliveryRouter = require('./deliveryRouter');

function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/factory', factoryRouter);
    app.use('/agency', agencyRouter);
    app.use('/delivery', deliveryRouter);
}

module.exports = route;