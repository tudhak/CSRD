// AnsweredQuestion component to be displayed in MainPage if the user already answered some questions

function AnsweredQuestion({ answer }) {
  return (
    <div className="mb-4 rounded-xl border border-teal-950">
      <div className="text-white main-background-color items-center p-2 rounded-t-xl">
        <p className="shrink">
          <u>Sujet</u>: {answer.topic}
        </p>
        <p>
          <u>Sous-sujet</u>: {answer.subtopic}
        </p>
        <p>
          <u>Question</u>: <strong>{answer.label}</strong>
        </p>
      </div>
      <div className="bg-white p-2 rounded-b-xl">
        <p>
          <u>Réponse</u>: {answer.answer}
        </p>
      </div>
    </div>
  );
}

export default AnsweredQuestion;
