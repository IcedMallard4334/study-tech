// Firestore functions
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, } from "firebase/firestore";

// Our Firestore instance
import { db } from "../firebase/firebase";

//Get a user's profile
export const getUserProfile = async (uid) => {

    // Reference to users/{uid}
    const userRef = doc(db, "users", uid);

    // Fetch the document
    const snapshot = await getDoc(userRef);

    // Does it exist?
    if (!snapshot.exists()) {
        return null; //if user doesn't exists
    }

    // Return all the document data of user if user exists
    return {
        id: snapshot.id,
        ...snapshot.data(),
    };
};

/*Create a new user profile
This runs ONLY once.
Right after the learner completes their profile.
*/
export const createUserProfile = async (uid, profileData) => {

    const userRef = doc(db, "users", uid);

    await setDoc(userRef, {
        ...profileData,
        // Metadata
        metadata: {
            createdAt: serverTimestamp(),
        }
    });
};

//Update an existing profile
export const updateUserProfile = async (uid, updatedData) => {

    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, updatedData);
};

//Complete the onboarding process
export const completeOnboarding = async ( uid, learningStyle, scores) => {

    const userRef = doc( db, "users", uid);

    await updateDoc(userRef, {

        preferences: {

            learningStyle: {

                dominant: learningStyle,

                scores,

            },

        },

        onboarding: {

            completed: true,

        },

    });


};