const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const factoryRouter = require('./factoryRouter');
const agencyRouter = require('./agencyRouter');
const deliveryRouter = require('./deliveryRouter');
const guaranteeRouter = require('./guaranteeRouter');


function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/factory', factoryRouter);
    app.use('/agency', agencyRouter);
    app.use('/delivery', deliveryRouter);
    app.use('/guarantee', guaranteeRouter);
}

module.exports = route;