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

const findReviewProblem = async (): Promise<string> => {
    try {
        // Find the review problem with the latest updatedAt time
        const latestReviewProblem = await reviewProblemModel.findOne().sort({ updatedAt: -1 });

        if (latestReviewProblem) {
            // Construct the string containing information from question, choices, and solution
            const question = latestReviewProblem.question;
            const choices = Object.entries(latestReviewProblem.choices).map(([key, value]) => `${key}: ${value}\n`).join(' ');
            const solution = Object.entries(latestReviewProblem.solution).map(([key, value]) => `${key}: ${value}\n`).join(' ');

            const reviewProblemString = `Question:\n${question}\nChoices:\n${choices}\nSolution: ${solution}`;

            console.log('Latest review problem found:', reviewProblemString);
            return reviewProblemString;
        } else {
            console.log('No review problem found');
            return 'ERROR: No review problem found';
        }
    } catch (err) {
        console.error('Error finding review problem:', err);
        throw err;
    }
}

export default {createReviewProblem, findReviewProblem};