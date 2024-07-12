import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { registerNewUser } from "../api/apiServices";
import { useAuth } from "../contexts/AuthContext";

// Register page handling user sign up

function RegisterPage() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const { setIsAuthenticated } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerNewUser(userDetails, navigate, updateUser, () => {
      setIsAuthenticated(true);
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-3/4 md:w-1/2 tertiary-background-color p-10 pb-7 lg:p-14 xl:p-20 lg:pb-14 rounded-2xl shadow-md">
        <h1 className="main-color text-center text-2xl mb-8">
          Créer un compte
        </h1>
        <form className="mb-8" onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="firstname"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                Prénom
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={userDetails.firstname}
                onChange={handleChange}
                placeholder="Prénom"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                Nom
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nom"
                value={userDetails.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={userDetails.password}
              onChange={handleChange}
              placeholder="•••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white main-background-color hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Valider
          </button>
        </form>
        <div className="flex justify-center">
          <Link
            className={"main-color text-md underline text-center font-semibold"}
            to="/"
          >
            Retourner à la page d'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
