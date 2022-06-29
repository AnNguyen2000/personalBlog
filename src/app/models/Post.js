//Import library:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete"); // Require mongoose-delete

//Connect DB:
const Post = new Schema(
  {
    name: { type: mongoose.Schema.Types.String },
    desc: { type: mongoose.Schema.Types.String },
    purport:{type:mongoose.Schema.Types.String},
    img:{type:mongoose.Schema.Types.String},
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at' }
  }
);

// Add plugin mongoose-delete:
Post.plugin(mongooseDelete, {
  overrideMethods: true, //Không hiện thị field bị soft delete
  deletedAt: true, //Thêm 1 key deletedAt
});

module.exports = mongoose.model("Post", Post);
