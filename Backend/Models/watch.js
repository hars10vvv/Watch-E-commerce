const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const watchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      enum: ["Men", "Women", "Unisex", "Kids"],
      required: true,
    },
    features: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

watchSchema.post("findOneAndDelete", async (data) => {
  if (data) {
    await Review.deleteMany({ _id: { $in: data.reviews } });
  }
});

module.exports = mongoose.model("Watch", watchSchema);
