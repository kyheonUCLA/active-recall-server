import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({ 
    schemaOptions: { 
        timestamps: true
    }, options: {
        allowMixed: Severity.ALLOW 
    }
})
class ReviewProblem {
    @prop({ required: true })
    question!: string;

    @prop({ required: true, type: () => Object }) // Needs to be a key value pair for letter and answer
    choices!: Record<string, string>;

    @prop({ required: true, type: () => Object })
    solution!: Record<string, string>;
}

const reviewProblem = getModelForClass(ReviewProblem);

export default reviewProblem;
