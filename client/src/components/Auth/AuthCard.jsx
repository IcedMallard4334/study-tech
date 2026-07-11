//client/src/components/Auth/AuthCard.jsx

import "./AuthCard.css";
import { loginWithGoogle } from "../../services/authService";

const AuthCard = () => {

    const handleGoogleLogin = async () => {

        try {
            await loginWithGoogle();
        }
        catch (error) {
            console.error(error);

        }
    };

    return (
        <div className="auth-card">
            <h1>Welcome to StewardTech</h1> 

            <p>Learn it in a way that makes sense to you.</p>

            <button
                className="google-btn"
                onClick={handleGoogleLogin}
            >
                Continue with Google
            </button>
        </div>

    );
}
 
export default AuthCard;