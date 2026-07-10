import './StepIndicator.css'

//Displays progress through the onboarding process.
const StepIndicator = ({currentStep, totalSteps}) => {
    return (  
        <div className="step-indicator">

            {

                [...Array(totalSteps)].map((_, index)=>(

                    <div

                        key={index}

                        className={

                            index < currentStep

                            ?

                            "step active"

                            :

                            "step"

                        }

                    />

                ))

            }

        </div>
    );
}
 
export default StepIndicator;