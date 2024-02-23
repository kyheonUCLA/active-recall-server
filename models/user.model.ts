import { 
  Severity, 
  getModelForClass, 
  modelOptions, 
  pre, 
  prop,
  DocumentType 
} from "@typegoose/typegoose";

import argon2 from "argon2";
import { nanoid } from "nanoid";

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const hash = await argon2.hash(this.password);
  this.password = hash;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  }, options: {
    allowMixed: Severity.ALLOW
  }
})
class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;
 
  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;
  
  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;
 
  @prop()
  passwordResetCode: string | null;
  
  @prop({ default: false })
  verified: boolean;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword)
    } catch(e) {
      console.log(e)
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel
export { User }