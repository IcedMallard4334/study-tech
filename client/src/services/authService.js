//client/src/services/authService.js

//Firebase authentication methods
import { signInWithPopup, signOut } from "firebase/auth";

// Import our initialized auth instance and Google provider
import { auth, googleProvider} from "../firebase/firebase";


//Login with Google
export const loginWithGoogle = async () => {
    try {
        //Opens Google's login popup
        const result = await signInWithPopup(auth, googleProvider);

        // The authenticated Firebase user
        return result.user;

    } 
    catch (error) {
        console.error("Google sign-in failed:", error);
        throw error;

    }

};

//Logout
export const logoutUser = async () => {

    await signOut(auth);

};