const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the client'],
  },
  streetAddress: String,
  streetAddress2: String,
  territory: String,
  mailCode: String,
  country: String,
  province: String,
  number: Number,
  invoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
  ],
});

module.exports = mongoose.model('Client', clientSchema);
