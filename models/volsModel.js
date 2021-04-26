const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const volSchema = new Schema({
  userId: Schema.Types.ObjectId,

  departure: { type: String, required: true },
  departureDate: { type: Date, required: true },
  arrival: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  finalPrice: { type: String, required: true },
  currency: { type: String, required: true },
  aircraft: { type: String, required: true },
  carrier: { type: String, required: true },
});

const Vol = mongoose.model("Vol", volSchema);

module.exports = Vol;
