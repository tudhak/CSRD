import { Link } from "react-router-dom";

// Simple page not found to display 404 error

function PageNotFound() {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold main-color">Erreur 404</h1>
          <h2 className="text-2xl">Page non trouvée</h2>
          <div className="flex justify-center">
            <Link
              className={"main-color text-md underline font-semibold"}
              to="/"
            >
              Retourner à la page d'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
