import { useTheme } from "../../hooks/useTheme";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";

function Header() {
  const { theme } = useTheme();
  return (
    <header className="bg-blue-300 text-blue-950 dark:bg-blue-950 p-5 dark:text-white text-5xl font-extralight h-40 text-center">
      <Navbar  />
    </header>
  );
}

export default Header;
