import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true} })
class ReviewProblem {
    @prop({ required: true })
    question!: string;

    @prop({ required: true })
    choices!: string;

    @prop({ required: true })
    solution!: string;
}

const reviewProblem = getModelForClass(ReviewProblem);

export default reviewProblem;
