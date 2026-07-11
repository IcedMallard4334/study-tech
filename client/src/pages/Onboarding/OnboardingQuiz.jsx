import QuizCard from "../../components/QuizCard/QuizCard";
import onboardingQuestions from "../../data/onboardingQuestions";
import { completeOnboarding } from "../../services/userService";
import { useAuth } from "../../context/useAuth";
import { useState } from "react";
import "./OnboardingQuiz.css";

const OnboardingQuiz = () => {

    const { user, refreshProfile } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [scores, setScores] = useState({

        reading_writing:0,

        auditory:0,

        visual:0,

        kinesthetic:0,

    });

    const handleSelect = (option) => {

        setSelectedOption(option);

    };


    const handleNext = async () => {

        if (!selectedOption || isSubmitting) return;
        
         // Copy the current scores
        const updatedScores = {
            ...scores,
        };

        // Add the selected answer's weights
        Object.entries(selectedOption.scores).forEach(([style, value]) => {
            updatedScores[style] += value;
        });

        // Save the updated scores for the next question
        setScores(updatedScores);

        // Last question?
        if ( currentQuestion === onboardingQuestions.length - 1) {

            const dominantStyle = getLearningStyle(updatedScores);
            setIsSubmitting(true);
            try{
                await completeOnboarding(

                    user.uid,

                    dominantStyle,

                    updatedScores

                );

                await refreshProfile();
            }
            finally{
                setIsSubmitting(false);
            }

            return;

        }

        setSelectedOption(null);

        setCurrentQuestion((prev) => prev + 1);

    };

    const getLearningStyle = (scores) => {

        return Object.keys(scores).reduce(

            (highest, current) =>

                scores[current] >

                scores[highest]

                    ? current

                    : highest

        );

    };

    if(currentQuestion >= onboardingQuestions.length){

        return(
            <h2>Quiz Finished!</h2>
        );

    }

    return(
        
        <div className="onboarding-page">
            <QuizCard

                question={ onboardingQuestions[currentQuestion]}

                selectedOption={selectedOption}

                onSelect={handleSelect}

                onNext={handleNext}

                isSubmitting={isSubmitting}

                currentQuestion={currentQuestion + 1}

                totalQuestions={onboardingQuestions.length}
            
            />
        </div>

    );

}
 
export default OnboardingQuiz;