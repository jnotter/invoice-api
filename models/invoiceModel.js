const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  clientName: String,
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  modifiedDate: Date,
  title: {
    type: String,
    default: 'INVOICE',
  },
  format: {
    type: String,
    default: 'HOURS',
  },
  issueDate: Date,
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date for this invoice'],
  },
  invoiceNumber: {
    type: Number,
    required: [true, 'Please provide an invoice number'],
  },
  shipToSameAsBillTo: {
    type: Boolean,
    default: true,
  },
  notes: String,
  paymentTerm: {
    type: Number,
    default: 0,
  },
  items: Array,
  gst: Number,
  pst: Number,
  hst: Number,
  subTotal: {
    type: Number,
  },
  total: Number,
  addGST: {
    type: Boolean,
    default: true,
  },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
