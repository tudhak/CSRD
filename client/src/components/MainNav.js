import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { logoutUser } from "../api/apiServices";
import {
  PowerIcon,
  BuildingLibraryIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

// Main navbar

function PageNav() {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  return (
    <div className="flex justify-center lg:justify-end items-center p-8 main-background-color">
      <nav className="border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <div className="w-full">
            <ul className="font-medium flex flex-row items-center gap-8 md:gap-10">
              <li>
                <Link
                  to="/main"
                  className="block py-2 px-3 text-white hover:text-emerald-200 hidden sm:block"
                >
                  Mon espace
                </Link>
                <Link to="/main">
                  <BuildingLibraryIcon className="h-8 w-8 text-white hover:text-emerald-200 block sm:hidden" />
                </Link>
              </li>
              <li>
                <Link
                  to="/questions"
                  className="block py-2 px-3 text-white hover:text-emerald-200 hidden sm:block"
                >
                  Questions
                </Link>
                <Link to="/questions">
                  <QuestionMarkCircleIcon className="h-8 w-8 text-white hover:text-emerald-200 block sm:hidden" />
                </Link>
              </li>
              <li>
                <button
                  className="block py-2 px-3 text-white align-center hover:text-emerald-200 hidden sm:inline-block"
                  onClick={() => logoutUser(navigate, updateUser)}
                >
                  Me déconnecter
                </button>
                <button>
                  <PowerIcon
                    className="h-8 w-8 text-white hover:text-emerald-200 inline-block sm:hidden"
                    onClick={() => logoutUser(navigate, updateUser)}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default PageNav;
