//client/src/context/AuthContext.jsx 

import { createContext, useEffect, useState } from "react";

// Firestore functions
import { getUserProfile } from "../services/userService";

// Firebase Authentication
import { onAuthStateChanged } from "firebase/auth";

// Our Firebase auth instance
import { auth } from "../firebase/firebase";


// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {

    // Currently logged in Firebase user
    const [user, setUser] = useState(null);

    // Firestore profile
    const [profile, setProfile] = useState(null);

    // Current authentication/application status
    const [status, setStatus] = useState("loading");

    /*
|--------------------------------------------------------------------------
| Loads the user's Firestore profile
|--------------------------------------------------------------------------
*/
    const loadProfile = async (firebaseUser) => {

        // No logged-in user
        if (!firebaseUser) {
            setUser(null);
            setProfile(null);
            setStatus("unauthenticated");

            return;

        }

        // Save the authenticated Firebase user
        setUser(firebaseUser);

        // Fetch Firestore profile
        const existingProfile =
            await getUserProfile(firebaseUser.uid);

        // First-time learner
        if (!existingProfile) {
            setProfile(null);
            setStatus("needs-profile");

            return;

        }

        // Save profile
        setProfile(existingProfile);

        // Has onboarding been completed?
        if (existingProfile.onboarding.completed) {
            setStatus("ready");
        }
        else {
            setStatus("needs-onboarding");
        }

    };

    useEffect(() => {
        // Listen for Firebase authentication changes
        const unsubscribe = onAuthStateChanged( auth, async (currentUser) => {
            await loadProfile(currentUser);
        });

        //Clean up the listener when the component unmounts.
        return unsubscribe;

    }, []);

    /*Refresh the current user's profile
    We call this whenever something changes in Firestore.
    */
    const refreshProfile = async () => {
        if (!user) return;
        await loadProfile(user);
    };

    const value = {
        user,
        profile,
        status,
        refreshProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
 