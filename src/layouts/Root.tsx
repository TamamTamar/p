import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../contexts/AuthContext";

const Root = () => {

  const { user, isLoggedIn } = useAuth()
  return (
    <div className="flex flex-col min-h-screen text-blue-500">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
