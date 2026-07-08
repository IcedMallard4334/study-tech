import Button from "../common/Button/Button";
import Card from "../common/Card/Card";
import StepIndicator from "../onboarding/StepIndicator/StepIndicator";
import './QuizCard.css'

const QuizCard = ({question, onSelect, selectedOption, onNext, isSubmitting, currentQuestion,totalQuestions}) => {
    console.log(question);
    return (  
        <Card>

            <StepIndicator

                currentStep={currentQuestion}

                totalSteps={totalQuestions}

            />

            <p className="question-counter">

                Question {currentQuestion} of {totalQuestions}

            </p>

            <h2>

                {question.question}

            </h2>

            <div className="quiz-options">

                {

                    question?.options?.map((option) => (

                        <Button key={option.id}
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