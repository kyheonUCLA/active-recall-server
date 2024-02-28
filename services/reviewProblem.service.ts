import reviewProblem from "../models/reviewProblem.model";
import reviewProblemType from "../utils/types"

const createReviewProblem = (input: reviewProblemType ) => {
    return reviewProblem.create();
}

export default createReviewProblem