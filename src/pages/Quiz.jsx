// With this component we will implement the quiz page using Axios to make the request to the API, TailwindCSS for the styles and Redux to manage the state of the application.

// We will use the useSelector hook to access the state of the application and the useDispatch hook to dispatch the action that will update the state of the application.

// We will use the analyzeQuiz action to update the state of the application and show the result of the quiz after the result has loaded, replacing the quiz with the result with a ternary operator. The loading state will be used to show a loading indicator while the result is loading.

// We will use the handleSubmit method of the react-hook-form library to handle the form submission.

// This is an example of the data that we will send to the API:
// {
//     "userId": "6490c7dbf07e4f278d37eae1",
//     "responses": [
//         {
//             "question": "What do you value the most in life?",
//             "response": "I value family and personal growth the most in my life."
//         },
//         {
//             "question": "Do you believe that everything is predetermined or that we have free will?",
//             "response": "I believe in a mix of both, certain things might be predetermined but within some boundaries, we have the free will to make choices."
//         },
//         {
//             "question": "What role does logic play in your decision-making process?",
//             "response": "Logic plays a significant role in my decision-making process, but I also consider emotions and intuition."
//         },
//         {
//             "question": "Do you think that moral values are universal or relative to social and cultural contexts?",
//             "response": "I think that some core moral values might be universal, but many are relative to social and cultural contexts."
//         },
//         {
//             "question": "How do you define a good life?",
//             "response": "A good life for me is having a balance between personal fulfillment, meaningful relationships, and contributing positively to society."
//         },
//         {
//             "question": "Do you believe in life after death?",
//             "response": "I am not sure about life after death, but I am open to different possibilities."
//         },
//         {
//             "question": "What role does community play in individual well-being?",
//             "response": "Community plays a vital role in individual well-being as it provides support, a sense of belonging, and helps in personal development."
//         },
//         {
//             "question": "Do you think that humans are inherently good or evil?",
//             "response": "I believe humans have the capacity for both good and evil, and various factors like upbringing, environment, and experiences shape this."
//         }
//     ]
// }
// And we should get a JSON like this one:
// {
//     "analysis": "Some philosophies that might align with this worldview include:\n\n1. Existentialism: This worldview acknowledges the existence of predetermined factors but also emphasizes the importance of individual choice and responsibility in shaping one's life.\n\n2. Pragmatism: This philosophy values practicality and emphasizes the importance of considering both logic and experience in decision-making.\n\n3. Cultural Relativism: This worldview recognizes that moral values can vary across different social and cultural contexts, while also acknowledging the existence of certain universal moral principles.\n\n4. Humanism: This philosophy emphasizes the value and potential of human beings, recognizing that individuals have the capacity for both good and evil, and focusing on personal growth, relationships, and contributing positively to society.\n\n5. Social Constructivism: This worldview recognizes that individuals are influenced by their social and cultural contexts, and that moral values are constructed and shaped by these contexts. It also emphasizes the importance of community and social interaction in personal well-being."
// }
// The input fields should be "text", not optional, and have a maximum length of 500 characters.

// The submit button should be disabled while the form is submitting.

// Use the map method to iterate over the questions array and render the questions and the input fields.



import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { analyzeQuiz } from '../redux/usersSlice';
import { useForm } from "react-hook-form";

function Quiz() {

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const questions = [
        "What do you value the most in life?",
        "Do you believe that everything is predetermined or that we have free will?",
        "What role does logic play in your decision-making process?",
        "Do you think that moral values are universal or relative to social and cultural contexts?",
        "How do you define a good life?",
        "Do you believe in life after death?",
        "What role does community play in individual well-being?",
        "Do you think that humans are inherently good or evil?"
    ];


    const onSubmit = async (data) => {

        for (let i = 0; i < questions.length; i++) {
            data.responses[i].question = questions[i]
        }

        console.log(data);

        let userId = users._id;

        let refactoredData = {
            userId: userId,
            responses: [...data.responses]
        }

        console.log(refactoredData);

        dispatch(analyzeQuiz(refactoredData));
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 px-4 md:px-0">
            {
                !users.isQuizAnalyzed ? (
                    <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-bold mb-4 text-center">Quiz</h1>
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            {questions.map((question, index) => {
                                let questionNumber = index + 1;
                                return (
                                    <div key={index} className="flex flex-col">
                                        <label className="mb-2 font-semibold" htmlFor={questionNumber}>{question}</label>
                                        <input className="border border-gray-300 p-2 rounded" type="text" id={questionNumber} {...register(`responses.${index}.response`, { required: true, maxLength: 500 })} />
                                        {errors.responses && errors.responses[index] && errors.responses[index].response && <span className="text-red-500 text-sm">This field is required and has a maximum length of 500 characters</span>}
                                    </div>
                                )
                            })}
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={users.loading}>Submit</button>
                        </form>
                        {users.isLoading && (
                            <div className="flex justify-center items-center mt-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                                <p className="text-blue-500 ml-2">Loading...</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">Result</h1>
                        {
                            users.quizResults.map((result, index) => {
                                return (
                                    <p key={index} className="text-center text-xl">{result}</p>
                                )
                            })
                        }
                    </div>
                )

            }
        </div>
    )
}

export default Quiz