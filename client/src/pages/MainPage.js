import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import MainNav from "../components/MainNav";
import AnsweredQuestion from "../components/AnsweredQuestion";
import { fetchUserAnswers } from "../api/apiServices";

// Main user space, to be used as a welcoming screen and a simple dashboard with latest user actions

function MainPage() {
  const [answers, setAnswers] = useState(null);
  const { user } = useUser();

  const lastAnswers = answers?.slice(0, 5);
  const numOfAnswers = answers?.length;

  // Fetching user answers to display last 5 questions addressed by user
  // And display number of questions answered by user

  useEffect(
    function () {
      async function fetchLastAnswers() {
        await fetchUserAnswers(user?.id, setAnswers);
      }
      if (user && user.id) fetchLastAnswers();
    },
    [user, user?.id]
  );

  if (!user) return <p>Chargement des données de l'utilisateur...</p>;

  return (
    <div>
      <MainNav />
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-14 text-3xl font-semibold text-center main-color">
          Mon espace
        </h1>
        <div className="w-screen flex justify-center align-items pb-10">
          <div className="w-5/6 sm:w-3/4 lg:w-2/3 bg-stone-100 p-10 rounded-2xl shadow-md">
            <p className="text-center mb-6 main-color text-lg font-bold">
              Bonjour {user.firstname} {user.lastname}
            </p>
            <p className="text-center mb-16">
              Vous avez répondu à <strong>{numOfAnswers}</strong>
              {`${numOfAnswers === 1 ? " question" : " questions"}`}.
            </p>
            <h2 className="text-center main-color font-semibold underline text-lg mb-8">
              Mes 5 dernières questions traitées
            </h2>
            {/* Addition of a random number to the key because some questions have the same subtopic and label */}
            {lastAnswers?.length > 0 ? (
              lastAnswers?.map((answer) => (
                <AnsweredQuestion
                  answer={answer}
                  key={`${answer.subtopic}-${answer.label}-${Math.floor(
                    Math.random() * 1000
                  )}`}
                />
              ))
            ) : (
              <p className="text-center">
                Vous n'avez répondu à aucune question pour le moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
