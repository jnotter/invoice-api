const Invoice = require('../models/invoiceModel');
const Client = require('../models/clientModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getClients = async (req, res, next) => {
  const features = new APIFeatures(Client.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const clients = await features.query;

  res.status(200).json({
    status: 'success',
    results: clients.length,
    data: {
      clients,
    },
  });
};

exports.createClient = catchAsync(async (req, res, next) => {
  const client = new Client(req.body);
  await client.save();

  res.status(201).json({
    status: 'success',
    data: {
      client,
    },
  });
});

exports.getClient = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      client,
    },
  });
});

exports.updateClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      client,
    },
  });
});

exports.deleteClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id);

  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  res.status(204).json({
    statis: 'success',
    data: null,
  });
});

exports.getClientInvoices = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id).populate('invoices');
  const { invoices } = client;

  res.status(201).json({
    status: 'success',
    data: {
      invoices,
    },
  });
});
