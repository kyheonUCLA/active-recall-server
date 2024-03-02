interface ReviewProblemInput {
    question: string;
    choices: Record<string, string>;
    solution: Record<string, string>;
}

export default ReviewProblemInput