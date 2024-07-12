import { topicLabels } from "../constants/topicLabels";
import { standardFetch } from "./apiHelper";
import { toast } from "react-toastify";

// Data fetching functions

// Getting topics when QuestionsPage.js loads
async function fetchTopics(setTopics) {
  try {
    const topicsData = await standardFetch("/api/v1/topics");
    const topicsWithLabels = topicsData.map((topicData) => {
      const matchingTopic = topicLabels.find(
        (topicLabelElement) => topicLabelElement.topic === topicData.topic
      );
      return matchingTopic
        ? { ...topicData, label: matchingTopic.label }
        : topicData;
    });
    // Updating topics state variable in QuestionsPage.js
    setTopics(topicsWithLabels);
  } catch (error) {
    toast.error("Erreur de récupération des sujets");
    console.error("Error fetching topics", error);
  }
}

// Getting subtopics based on selected topic in QuestionsPage.js
async function fetchSubTopics(selectedTopic, setSubtopics) {
  try {
    const subtopicsData = await standardFetch(
      `/api/v1/topics/${selectedTopic}/subtopics`
    );
    // Updating subtopics state variable in QuestionsPage.js
    setSubtopics(subtopicsData);
  } catch (error) {
    toast.error("Erreur de récupération des sujets");
    console.error("Error fetching subtopics:", error);
  }
}

// Getting questions based on selected topic and selected subtopic in QuestionsPage.js
async function fetchQuestions(selectedTopic, selectedSubtopic) {
  try {
    const questionsData = await standardFetch(
      `/api/v1/topics/${selectedTopic}/subtopics/${selectedSubtopic}/questions`
    );
    // questions state variable not set in this function to prevent issues resulting from async operations
    // returning the data instead to update state in QuestionsPage.js
    return questionsData;
  } catch (error) {
    toast.error("Erreur de récupération des questions");
    console.error("Error fetching questions:", error);
  }
}

// Getting user answers
async function fetchUserAnswers(userId, setAnswers) {
  try {
    const answerData = await standardFetch(`/api/v1/answers/users/${userId}`);
    // Setting answer state in MainPage.js
    setAnswers(answerData);
  } catch (error) {
    toast.error("Erreur de récupération des réponses");
    console.error("Error fetching answers:", error);
  }
}

// Creating new user
// Adding a callback function to handle issues arising from async operations
async function registerNewUser(userDetails, navigate, updateUser, onSuccess) {
  try {
    const userData = await standardFetch("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(userDetails),
    });
    const { user } = userData.data;
    console.log("Response data:", user);
    updateUser(user);
    if (onSuccess) onSuccess();
    toast.success("Inscription effectuée !");
    navigate("/main");
  } catch (error) {
    toast.error("Votre inscription n'a pas pu aboutir");
    console.error("Registration error:", error);
  }
}

// Logging out user
async function logoutUser(navigate, updateUser) {
  try {
    await standardFetch("/api/v1/auth/logout", {
      method: "POST",
    });
    console.log("Logout successful");
    toast.success("Déconnexion réussie.");
    navigate("/");
    updateUser(null);
  } catch (error) {
    toast.error("Erreur lors de la déconnexion");
    console.error("Logout error:", error);
  }
}

// Getting answer for selected question and current user
async function fetchAnswer(question, user, setAnswer, setIsExistingAnswer) {
  try {
    const answerData = await standardFetch(
      `/api/v1/answers/questions/${question.id}/users/${user.id}`
    );
    // Querying the DB to find whether there is an existing answer for a specific question and current user
    // If yes, updating answer and isExisting answer states in AnswerBox.js
    // Updating the answer state will display the existing answer in the DB under the selected question
    if (answerData.answer) {
      setAnswer(answerData.answer);
      setIsExistingAnswer(true);
    }
  } catch (error) {
    console.log(
      `Error fetching answer for question ${question.id} and user ${user.id}`,
      error
    );
  }
}

// Saving answer to the DB
// If there is no answer yet in the DB for the selected question and current user, make a POST request (create)
// If there an answer, make a PATCH request (update)
async function saveAnswer(
  isExistingAnswer,
  setIsExistingAnswer,
  user,
  question,
  answer
) {
  // Changing dynamically method and url depending on existence of answer
  const method = isExistingAnswer ? "PATCH" : "POST";
  const url = `/api/v1/answers${
    isExistingAnswer ? `/questions/${question.id}/users/${user.id}` : ""
  }`;
  try {
    const answerData = await standardFetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        questionId: question.id,
        answerText: answer,
      }),
    });
    console.log(
      `Answer successfully saved to the database: ${JSON.stringify(answerData)}`
    );
    toast.success("Réponse sauvegardée dans la base de données.");
    // updating isExistingAnswer state
    setIsExistingAnswer(true);
  } catch (error) {
    toast.error("Votre réponse n'a pas pu être sauvegardée");
    console.log("Error saving answer:", error);
  }
}

// Logging in user
// Adding a callback function to handle issues arising from async operations
async function loginUser(email, password, updateUser, navigate, onSuccess) {
  try {
    await standardFetch("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // If login is successful, fetch user info
    const userData = await standardFetch("/api/v1/users/me");

    // Update state and navigate
    updateUser(userData);
    navigate("/main");
    // Call onSuccess callback after user state is updated
    if (onSuccess) onSuccess();
    toast.success("Connexion réussie.");
  } catch (error) {
    toast.error("Erreur lors de la connexion");
    console.error("Error during login:", error);
  }
}

export {
  fetchTopics,
  fetchSubTopics,
  fetchQuestions,
  fetchUserAnswers,
  registerNewUser,
  logoutUser,
  fetchAnswer,
  saveAnswer,
  loginUser,
};
