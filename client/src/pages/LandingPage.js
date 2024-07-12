import React from "react";
import UserLogin from "../components/UserLogin";
import { Link } from "react-router-dom";

// Landing page including a login form and a sign up link

function LandingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-5/6 sm:w-3/4 md:w-2/3 2xl:w-1/2 main-container-height p-0 rounded-2xl border main-border-color shadow-md">
        <div className="main-background-color w-full rounded-t-2xl p-8 gap-5 sm:p-16 sm:gap-10 min-h-60 flex flex-col justify-center items-center">
          <h1 className="text-white text-center text-3xl sm:text-4xl">
            Votre outil de pilotage CSRD.
          </h1>
          <h2 className="secondary-color text-center text-xl sm:text-2xl">
            Un espace centralisé pour répondre aux questions de durabilité et
            alimenter votre rapport.
          </h2>
        </div>
        <div className="flex h-full flex-col items-center justify-center p-4 gap-4 sm:gap-8 md:gap-10 lg:gap-12">
          <div>
            <span className="main-color text-center font-semibold text-xl">
              Se connecter
            </span>
          </div>

          <UserLogin />

          <div>
            <span className="text-semibold">
              <Link
                className={"main-color text-md underline font-semibold"}
                to="/register"
              >
                Créer un compte
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
