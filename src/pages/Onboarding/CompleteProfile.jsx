import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { createUserProfile} from "../../services/userService";
import Card from "../../components/common/Card/Card";
import Select from "../../components/common/Select/Select";
import Button from "../../components/common/Button/Button";
import "./CompleteProfile.css";

const CompleteProfile = () => {

    const { user, refreshProfile } = useAuth();
    const [formData, setFormData] = useState({
        academics: {
            curriculum: "",
            grade: "",
            subjects: [],
        }
    });

    const updateAcademicField = (field, value) => {

        setFormData((prev) => ({

            ...prev,

            academics: {

                ...prev.academics,

                [field]: value,

            },

        }));

    };

    const curriculumList = [
        "CAPS",
        "IEB",
        "Cambridge(AS/A Level)",
    ];

    const subjectList = [
        "Mathematics",
        "Physical Sciences",
        "Life Sciences",
        "Accounting",
        "English",
    ];

    const gradesList = [
        "8",
        "9",
        "10",
        "11",
        "12",
    ];

    const handleSubjectChange = (subject) => {
        const subjects = formData.academics.subjects;

        if(subjects.includes(subject)){
            updateAcademicField(
                "subjects",
                subjects.filter(item => item !== subject)
            );
        }

        else {
            updateAcademicField(
                "subjects",
                [...subjects, subject]
            );

        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await createUserProfile(user.uid,{
            personal: {
                fullName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            },

            academics: formData.academics,

            onboarding: {
                completed: false,
            },
        });
        
        await refreshProfile();

    }


    return (  
        <div className="complete-profile-page">

            <Card>

                <h1>
                    Academic Information
                </h1>

                <p>
                    Tell us a little about your studies.
                </p>

                {/* Form goes here */}
                <form onSubmit={handleSubmit}>
                    <Select

                        label="Curriculum"

                        value={formData.academics.curriculum}

                        options={curriculumList}

                        onChange={(e) =>

                            updateAcademicField(

                                "curriculum",

                                e.target.value

                            )

                        }

                    />

                    <Select

                        label="Grade"

                        value={formData.academics.grade}

                        options={gradesList}

                        onChange={(e)=>

                            updateAcademicField(

                                "grade",

                                e.target.value

                            )

                        }

                    />

                    <h3>
                        Subjects
                    </h3>

                    {
                        subjectList.map(subject => (

                            <label key={subject}>

                                <input

                                    type="checkbox"

                                    checked={

                                        formData.academics.subjects.includes(subject)

                                    }

                                    onChange={() =>

                                        handleSubjectChange(subject)

                                    }

                                />

                                {subject}

                            </label>

                        ))
                    }

                    <Button type="submit">Continue</Button>
                </form>
            </Card>

        </div>
    );
}
 
export default CompleteProfile;