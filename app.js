const express = require('express');

const invoiceRoute = require('./routes/invoiceRoute');
const clientRoutes = require('./routes/clientRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

// Routes

app.use('/api/v1/invoices', invoiceRoute);
app.use('/api/v1/clients', clientRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
