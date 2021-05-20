//This is the user model file , the user file is the database model which is sent using the mongoose scehema model method
import mongoose from "mongoose";
//mongoose will be used as a tool  to connect the database , mongoose allows to create models and schemas for different resources in the database
import bcrypt from "bcryptjs";
//bcrypt bycrypyts the password of the user

//The user model should be created here
const userSchema = mongoose.Schema(
  {
    //The name of the user
    name: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
    },
    //The email of the user
    email: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
      //The unique value should be set to true
      unique: true,
    },
    //The password of the user
    password: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
    },
    //The is admin value of the user
    isAdmin: {
      //should be put as a boolean
      type: Boolean,
      //required to be true
      required: true,
      //Default should be put to false
      default: false,
    },
  },
  {
    //Time stamps of the product , the time , date when the product was created
    timestamps: true,
  }
);

//The user scehema match password method should be made here
userSchema.methods.matchPassword = async function (enteredPassword) {
  //If the entered password is true , means matching the regax
  return await bcrypt.compare(enteredPassword, this.password);
  //Then use await and encrpyt the password using the bcrypt bought in
};

//THE USER SCEMAS PASSWORD FIELD SHOULD NOT BE MODIFIED
userSchema.pre("save", async function (next) {
  //IF THE PASSWORD IS MODIFIED BY THE USER
  if (!this.isModified("password")) {
    //SEND THE NEW PASSWORD NEXT
    next();
  }

  //Salt is used to encrpyt the password in to 10 digits
  const salt = await bcrypt.genSalt(10);
  //The password should then hashed using the salt above
  this.password = await bcrypt.hash(this.password, salt);
});
//The user is now stored inside the user constant
const User = mongoose.model("User", userSchema);
//IT should be then exported to the controller
export default User;
