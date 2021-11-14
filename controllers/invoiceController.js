const Invoice = require('../models/invoiceModel');
const Client = require('../models/clientModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getInvoices = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Invoice.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const invoices = await features.query;

  res.status(200).json({
    status: 'success',
    results: invoices.length,
    data: {
      invoices,
    },
  });
});

exports.createInvoice = catchAsync(async (req, res, next) => {
  const client = await Client.find({ name: req.body.client });
  if (!client[0]) {
    client[0] = new Client({ name: req.body.client });
  }
  const newInvoice = new Invoice(req.body);
  newInvoice.clientID = client[0]._id;
  client[0].invoices.push(newInvoice);
  await client[0].save();
  await newInvoice.save();

  res.status(201).json({
    status: 'success',
    data: {
      invoice: newInvoice,
    },
  });
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    return next(new AppError('No invoice found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      invoice,
    },
  });
});

exports.updateInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!invoice) {
    return next(new AppError('No invoice found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      invoice,
    },
  });
});

exports.deleteInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);

  if (!invoice) {
    return next(new AppError('No invoice found with that ID', 404));
  }

  res.status(204).json({
    statis: 'success',
    data: null,
  });
});
