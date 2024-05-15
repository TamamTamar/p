import { FaAddressCard, FaHeart } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import { useAuth } from "../../contexts/AuthContext";


function Footer() {
  const { toggle } = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  return (
    <>
      <footer className=" flex justify-around bg-blue-300 dark:bg-blue-950  p-5 dark:text-white text-5xl">
        <PiWarningCircleBold className=" cursor-pointer text-blue-950 dark:text-white text-base" onClick={() => navigate("/about")} />
        {isLoggedIn && <FaHeart className=" cursor-pointer text-blue-950 dark:text-white text-base" onClick={() => navigate("/favorites")} />}
        {isLoggedIn && user?.isBusiness && (
          <FaAddressCard className=" cursor-pointer  text-blue-950 dark:text-white text-base" onClick={() => navigate("/my-cards")} />
        )}



      </footer>
    </>

  );
}

export default Footer;
