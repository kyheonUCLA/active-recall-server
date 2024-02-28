import reviewProblemModel from "../models/reviewProblem.model";
import reviewProblemType from "../utils/types"

const createReviewProblem = (input: reviewProblemType ) => {
    return reviewProblemModel.create(input);
}

export default {createReviewProblem}