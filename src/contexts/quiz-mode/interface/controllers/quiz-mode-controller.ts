import { QuizApi } from "../../application/ports/out/QuizApi";
import { QuizDescription } from "../../entities/quiz";

class QuizModeController {
    constructor(
        private readonly quizApi: QuizApi;
    ) {}
}


const quizModeController = new QuizModeController(
);

export {
    quizModeController
};
