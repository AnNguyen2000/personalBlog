//Import library:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete"); // Require mongoose-delete

//Connect DB:
const BlogUser = new Schema(
  {
    _id: { type: mongoose.Schema.Types.String },
    name:{type:mongoose.Schema.Types.String},
    role: { type: mongoose.Schema.Types.String },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at' }
  }
);

// Add plugin mongoose-delete:
BlogUser.plugin(mongooseDelete, {
  overrideMethods: true, //Không hiện thị field bị soft delete
  deletedAt: true, //Thêm 1 key deletedAt
});

module.exports = mongoose.model(" BlogUser",  BlogUser);
