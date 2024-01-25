import { 
  Severity, 
  getModelForClass, 
  modelOptions, 
  pre, 
  prop,
  DocumentType 
} from "@typegoose/typegoose";

import argon2 from "argon2";


// @ts-ignore
@pre<User>('save', async () => {
  // @ts-ignore
  if (!this.isModified('password')) {
    return;
  }
  // @ts-ignore
  const hash = await argon2.hash(this.password);
  // @ts-ignore
  this.password = hash;
})
// @ts-ignore
@modelOptions({
  schemaOptions: {
    timestamps: true,
  }, options: {
    allowMixed: Severity.ALLOW
  }
})
class User {
  // @ts-ignore
  @prop({ lowercase: true, required: true, unique: true })
  email: string;
  // @ts-ignore
  @prop({ required: true })
  firstName: string;
  // @ts-ignore
  @prop({ required: true })
  lastName: string;
  // @ts-ignore
  @prop({ required: true })
  password: string;
  // @ts-ignore
  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;
  // @ts-ignore
  @prop()
  passwordResetCode: string | null;
  // @ts-ignore
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