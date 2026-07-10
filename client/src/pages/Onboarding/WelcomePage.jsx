import './WelcomePage.css';
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";

const WelcomePage = () => {

    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/complete-profile");
    };

    return (  
        <div className="welcome-page">
            <Card className="welcome-card">
                <h1>Welcome to StewardTech</h1>

                <p className="subtitle"> We're excited to have you here!</p>

                <p className="description">
                    Before we personalize your learning
                    experience, we'd like to learn a little
                    about you.<br/>

                    This will only take about 2 minutes.
                </p>

                <Button onClick={handleStart}>Let's Get Started</Button>

            </Card>

        </div>
    );
}
 
export default WelcomePage;