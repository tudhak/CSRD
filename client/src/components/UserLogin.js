import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../api/apiServices";

// User Login component to be rendered on Landing page

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Callback function to solve potential issues caused by async functions
    loginUser(email, password, updateUser, navigate, () => {
      setIsAuthenticated(true);
    });
  };

  return (
    <div className="tertiary-background-color p-6 rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-6">
          <label className="w-32">Email utilisateur</label>
          <input
            type="text"
            className="p-1"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-6">
          <label className="w-32">Mot de passe</label>
          <input
            type="text"
            className="p-1"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md main-background-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
