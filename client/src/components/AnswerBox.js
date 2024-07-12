// Answer Box component to be rendered for each question, allowing user to type and submit an answer

import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { fetchAnswer } from "../api/apiServices";
import { saveAnswer } from "../api/apiServices";
import FormButton from "./FormButton";

function AnswerBox({ question }) {
  const [answer, setAnswer] = useState("");
  const [isExistingAnswer, setIsExistingAnswer] = useState(false);
  const { user } = useUser();

  useEffect(
    function () {
      const controller = new AbortController();
      fetchAnswer(question, user, setAnswer, setIsExistingAnswer, {
        signal: controller.signal,
      });

      return () => {
        controller.abort();
      };
    },
    [question, user]
  );

  function handleSubmit(e) {
    e.preventDefault();
    // Ensuring the user has typed something before fetching
    if (!answer)
      return console.log("Tapez une réponse avant de valider votre saisie.");
    saveAnswer(isExistingAnswer, setIsExistingAnswer, user, question, answer);
  }

  return (
    <form className="flex flex-col gap-4 items-start" onSubmit={handleSubmit}>
      <label hidden htmlFor={question.label}></label>
      <textarea
        id={question.label}
        name={question.label}
        placeholder="Tapez votre réponse"
        className="w-full p-2 rounded-lg"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      <FormButton />
    </form>
  );
}

export default AnswerBox;
