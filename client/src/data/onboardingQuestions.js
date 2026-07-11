//client/src/data/onboardingQuestions.js

const onboardingQuestions = [

    {
        id: 1,
        importance: 5,
        question: "When learning something completely new, what helps you understand it best?",
        
        options: [
            {
                id: 1,
                text: "Reading notes or textbooks",

                scores: {

                    reading_writing: 8,
                    auditory: 1,
                    visual: 2,
                    kinesthetic: 0,

                }
            },
            {
                id: 2,
                text: "Listening to someone explain it",
                scores: {

                    reading_writing: 1,
                    auditory: 8,
                    visual: 1,
                    kinesthetic: 1,

                }
            },
            {
                id: 3,
                text: "Watching diagrams, videos or demonstrations",
                scores: {

                    reading_writing: 1,
                    auditory: 1,
                    visual: 8,
                    kinesthetic: 2,

                }
            },
            {
                id: 4,
                text: "Trying it myself",
                scores: {

                    reading_writing: 0,
                    auditory: 1,
                    visual: 2,
                    kinesthetic: 8,

                }
            },

            ],

        },

        {
            id: 2,
            importance:4,
            question: "When studying for a test, you usually...",
            options: [
                {   id: 1,
                    text:"Rewrite my notes and summaries",
                    scores: {

                        reading_writing: 6,
                        auditory: 1,
                        visual: 2,
                        kinesthetic: 1,

                    }
                },
                {
                    id: 2,
                    text:"Explain the work out loud or discuss it",
                    scores: {

                        reading_writing: 1,
                        auditory: 6,
                        visual: 1,
                        kinesthetic: 2,

                    }
                },
                {
                    id: 3,
                    text:"Draw mind maps and diagrams",
                    scores: {

                        reading_writing: 2,
                        auditory: 0,
                        visual: 6,
                        kinesthetic: 2,

                    }
                },
                {
                    id: 4,
                    text: "Solve lots of practice questions",
                    scores: {

                        reading_writing: 1,
                        auditory: 1,
                        visual: 2,
                        kinesthetic: 6,

                    }
                }
            ],
        },

        {
            id: 3,
            importance:3,
            question: "Which classroom activity do you enjoy most?",
            options: [
                {
                    id: 1,
                    text: "Reading articles or textbooks",
                    scores: {

                        reading_writing: 5,
                        auditory: 1,
                        visual: 2,
                        kinesthetic: 0,
                    }
                },
                {
                    id: 2,
                    text: "Class discussions",
                    scores: {

                        reading_writing: 1,
                        auditory: 5,
                        visual: 1,
                        kinesthetic: 2,
                    }
                },
                {
                    id: 3,
                    text: "Presentations with images and diagrams",
                    scores: {

                        reading_writing: 1,
                        auditory: 1,
                        visual: 5,
                        kinesthetic: 2,
                    }
                },
                {
                    id: 4,
                    text: "Experiments and hands-on activities",
                    scores: {

                        reading_writing: 0,
                        auditory: 1,
                        visual: 2,
                        kinesthetic: 5,
                    }
                },
            ],
        },

];

export default onboardingQuestions;