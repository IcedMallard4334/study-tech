import Button from "../common/Button/Button";
import Card from "../common/Card/Card";
import ProgressBar from "../Onboarding/ProgressBar/ProgressBar";
import StepIndicator from "../onboarding/StepIndicator/StepIndicator";
import './QuizCard.css'

const QuizCard = ({question, onSelect, selectedOption, onNext, isSubmitting, currentQuestion,totalQuestions}) => {
    console.log(question);
    return (  
        <Card className="quiz-card">

            <div className="quiz-header">
                <StepIndicator

                    currentStep={2}

                    totalSteps={2}

                />

                <p className="step-label">

                    Step 2 of 2

                </p>

                <h1>

                    Learning Preferences

                </h1>

                <p className="quiz-description">

                    Answer a few questions so we can recommend lessons that match how you learn best.

                </p>
            </div>

            <div className="question-progress">
                <div className="progress-header">

                    <h3>

                        Question {currentQuestion}

                    </h3>

                    <span>

                        {totalQuestions}

                    </span>

                </div>

                <ProgressBar

                    current={currentQuestion}

                    total={totalQuestions}

                />
            </div>

            <h2 className="question-title">

                {question.question}

            </h2>

            <div className="quiz-options">

                {
                    question?.options?.map((option) => (
                        <Button className = "answerBtn" key={option.id}
                            variant={selectedOption?.id === option.id ? "primary" : "secondary"}
                            onClick={() => onSelect(option)}
                        >
                            {option.text}
                        </Button>
                    ))

                }

            </div>
            <Button  onClick={onNext} disabled={!selectedOption || isSubmitting}>
                {isSubmitting ? "Finishing..." : "Next"}
            </Button>

        </Card>

    );
}
 
export default QuizCard;