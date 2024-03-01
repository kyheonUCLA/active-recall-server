import reviewProblemModel from "../models/reviewProblem.model";
import reviewProblemType from "../utils/types";

const createReviewProblem = async (input: reviewProblemType ) => {
    try{
        const p = await reviewProblemModel.create(input);
        await p.save();
        console.log('Review problem saved successfully:', p);
    } catch (err) {
        console.error('Error saving review problem:', err);
        throw err;
    }
}

export default {createReviewProblem};