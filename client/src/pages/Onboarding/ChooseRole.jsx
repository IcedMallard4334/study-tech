import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import "./ChooseRole.css";
import { createUserProfile } from "../../services/userService";

const ChooseRole = () => {
    const navigate = useNavigate();

    const { user, refreshProfile } = useAuth();

    //If student selected
    const handleStudent = async () => {

        await createUserProfile(

            user.uid,

            {

                fullName: user.displayName,

                email: user.email,

                photoURL: user.photoURL,

                role: "student",

            }

        );

        await refreshProfile();

        navigate("/welcome");

    };

    // Temporary
    const handleVolunteer = () => {

        alert("Volunteer onboarding coming soon!");

    };

    return (

        <div className="choose-role-page">

            <Card className="choose-role-card">

                <h1>

                    Welcome to StewardTech

                </h1>

                <p className="role-description">

                    How will you be using StewardTech?

                </p>

                <div className="roles-container">

                    <div className="role-card">

                        <div className="role-icon">

                            🎓

                        </div>

                        <h2>

                            Student

                        </h2>

                        <p>

                            Learn through personalised lessons,
                            quizzes and AI-powered guidance.

                        </p>

                        <Button

                            onClick={handleStudent}

                        >

                            Continue as Student

                        </Button>

                    </div>

                    <div className="role-card">

                        <div className="role-icon">

                            🤝

                        </div>

                        <h2>

                            Volunteer

                        </h2>

                        <p>

                            Share your knowledge and help learners
                            succeed.

                        </p>

                        <Button

                            variant="secondary"

                            onClick={handleVolunteer}

                        >

                            Continue as Volunteer

                        </Button>

                    </div>

                </div>

            </Card>

        </div>

    );
}
 
export default ChooseRole;