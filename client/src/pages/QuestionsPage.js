import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";
import QuestionRender from "../components/QuestionRender";
import {
  fetchTopics,
  fetchSubTopics,
  fetchQuestions,
} from "../api/apiServices";
import CustomDropdown from "../components/CustomDropDown";

// Page to display topics, subtopics and questions
// Allowing the user to submit answers (create and edit existing answers)

function Questions() {
  const [topics, setTopics] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("E1");
  const [subtopics, setSubtopics] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState("E1.GOV-3");
  const [questions, setQuestions] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Fetching topics on component load

  useEffect(function () {
    fetchTopics(setTopics);
  }, []);

  // Fetching subtopics based on selectedTopic
  // Using an async function to always have synchonized state

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchSub() {
        await fetchSubTopics(selectedTopic, setSubtopics, {
          signal: controller.signal,
        });
      }
      fetchSub();

      return () => {
        controller.abort();
      };
    },
    [selectedTopic]
  );

  useEffect(
    function () {
      if (subtopics && subtopics.length > 0) {
        setSelectedSubtopic(subtopics[0].subtopic);
      }
    },
    [subtopics]
  );

  useEffect(
    function () {
      let isCurrent = true; // Flag to track if the effect is using the latest state
      const controller = new AbortController();

      const fetchAndUpdateQuestions = async () => {
        const questionsData = await fetchQuestions(
          selectedTopic,
          selectedSubtopic,
          { signal: controller.signal }
        );
        // Only update state if this effect has not been superseded
        // Update questionsData state here to ensure displayed questions use the latest state data
        if (isCurrent) setQuestions(questionsData);
      };

      fetchAndUpdateQuestions();

      return () => {
        isCurrent = false;
        controller.abort();
      };
    },
    [selectedTopic, selectedSubtopic]
  );

  // Handling selected question to open answer form for specific question

  function handleSelectQuestion(question) {
    setSelectedQuestion((currentQuestion) =>
      question.id === currentQuestion?.id ? null : question
    );
  }

  return (
    <>
      <MainNav />
      <div className="h-screen p-8 sm:p-16">
        <h1 className="text-4xl font-semibold main-color text-center mb-20">
          Questions CSRD
        </h1>
        <div className="flex flex-col gap-6 pb-10">
          <div className="flex flex-wrap justify-center md:flex-nowrap gap-6 items-center">
            <label className="w-56 text-center font-semibold main-color">
              Sélectionnez un sujet
            </label>
            <select
              value={selectedTopic}
              className="w-full max-w-80"
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              {topics?.map((topic) => (
                <option key={topic.topic} value={topic.topic}>
                  {topic.topic} - {topic.label}
                </option>
              ))}
            </select>
          </div>
          {/* Using a CustomDropdown component for subtopics since some subtopics'
          labels are too long to display correctly */}
          {subtopics ? (
            <div className="flex flex-wrap justify-center md:flex-nowrap gap-6 items-center mb-10">
              <label className="w-56 font-semibold main-color">
                Sélectionnez un sous-sujet
              </label>
              <CustomDropdown
                options={subtopics}
                selectedValue={selectedSubtopic}
                onChange={setSelectedSubtopic}
              />
            </div>
          ) : (
            <p className="text-center">Chargement des sous-sujets...</p>
          )}
          <div className="flex flex-col gap-6 mb-8 xl:w-3/4 mx-auto">
            {/* Using a random number in the key to avoid duplicate keys
          Some questions having the same subtopic and label */}
            {questions?.length > 0 ? (
              questions?.map((question) => (
                <QuestionRender
                  key={`${question.label}${Math.floor(Math.random() * 1000)}`}
                  question={question}
                  selectedQuestion={selectedQuestion}
                  onSelectQuestion={handleSelectQuestion}
                />
              ))
            ) : (
              <p className="text-center">Aucune question pour ce sous-sujet.</p>
            )}
          </div>
          <div className="flex justify-center">
            <Link
              className={"main-color text-md underline font-semibold"}
              to="/main"
            >
              Retourner à mon espace
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
