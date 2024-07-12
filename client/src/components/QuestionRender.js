import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import AnswerBox from "./AnswerBox";

// Component to display each question after being successfully fetched from the DB

function QuestionRender({ question, selectedQuestion, onSelectQuestion }) {
  const isSelected = selectedQuestion?.id === question.id;

  return (
    <>
      <div className="flex flex-nowrap tertiary-background-color items-center gap-6 p-2 border border-teal-950 rounded-lg">
        <PlusIcon
          className={`h-6 w-6 shrink-0 cursor-pointer ${
            isSelected ? "hidden" : ""
          }`}
          onClick={() => onSelectQuestion(question)}
        />
        <MinusIcon
          className={`h-6 w-6 shrink-0 cursor-pointer ${
            isSelected ? "" : "hidden"
          }`}
          onClick={() => onSelectQuestion(question)}
        />
        <p className="shrink font-semibold">
          {question.subtopic} - {question.label}
        </p>
      </div>
      {/* Answer component to be displayed for a specific question once the specific question has been selected(clicked) by user */}
      {isSelected && <AnswerBox question={question} />}
    </>
  );
}

export default QuestionRender;
