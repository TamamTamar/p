import { createBrowserRouter } from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import Cards from "./Cards.tsx";
import Error from "./Error.tsx";
import Card from "./Card.tsx";
import Root from "../layouts/Root.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Profile from "./Profile.tsx";
import CreateCard from "./CreateCard.tsx";
import MyCards from "./MyCards.tsx";
import UpdateCard from "./UpdateCard.tsx";
import About from "../components/About/About.tsx";
import ProtectedRouteBiz from "../components/ProtectedRouteBiz.tsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Cards /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/cards", element: <Cards /> },
      { path: "/cards/:id", element: <Card /> },
      {path:"/about", element:<About/>},
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
           <Cards favoritesOnly={true} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-card",
        
        element:
        <ProtectedRouteBiz>
         <CreateCard />
        </ProtectedRouteBiz>,
      },
      {
        path: "/my-cards",
        element:
         <ProtectedRouteBiz>
         <MyCards />
        </ProtectedRouteBiz>,
      },
      {
        path: "/update/:id",
        element:
         <ProtectedRouteBiz>
         <UpdateCard />
        </ProtectedRouteBiz>,
      },     
    ],
  },
]);
