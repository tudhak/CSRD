// Button component to be rendered in the AnswerBox component (submit answer)

function FormButton() {
  return (
    <button
      type="submit"
      className="text-white main-background-color hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
    >
      Valider
    </button>
  );
}

export default FormButton;
