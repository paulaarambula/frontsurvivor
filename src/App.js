import "./styles/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Index from "./pages/Index";
import IndexAdmin from "./pages/admin/IndexAdmin";
import IndexUsers from "./pages/users";
import IndexProject from "./pages/project/IndexProject";
import CreateProject from "./pages/project/CreateProject";
import Users from "./pages/admin/Users";
import Card from "./components/card/Card";
import EditUser from "./pages/users/EditUser";
import PrivateLayouth from "./layouts/privateLayout";
import AdminIndex from "./pages/AdminIndex";
import { UserContext } from "./context/user";
import { AuthContext } from "./context/authContext";
import { DarkContext } from "./context/dark";
import { useEffect, useState } from "react";
import Register from "./pages/auth/register";
import LayoutAuth from "./layouts/LayoutAuth";
import Login from "./pages/auth/login";
import jwt_decode from "jwt-decode";
import Template from "./pages/TemplateLayouth";
import EditProject from "./pages/project/EditProject";

// const httpLink = createHttpLink({
//   uri: "https://api-proyecta-tic.herokuapp.com/graphql"
// })
const httpLink = createHttpLink({
  uri: "https://survivorbackend.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // uri: "https://api-proyecta-tic.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({ data: "testUserData" });
  const [modeDark, setModeDark] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };
  useEffect(() => {
    if (authToken) {
      const decode = jwt_decode(authToken);
      setUserData({
        _id: decode._id,
        name: decode.name,
        lastname: decode.lastname,
        email: decode.email,
        identification: decode.identification,
        rol: decode.rol,
      });
      console.log("Datos del usuario: ", userData);
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ setToken, authToken, setAuthToken }}>
        <DarkContext.Provider value={{ modeDark, setModeDark }}>
          <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/template" element={<Template />} />
                <Route path="/auth" element={<LayoutAuth />}>
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                </Route>
                <Route path="/admin/index" element={<AdminIndex />} />
                <Route path="/admin" element={<PrivateLayouth />}>
                  <Route path="" element={<IndexAdmin />} />
                  <Route path="usuarios" element={<Users />} />
                  <Route path="project/index" element={<IndexProject />} />
                  <Route path="project/create" element={<CreateProject />} />
                  <Route path="user/index" element={<IndexUsers />} />
                  <Route path="edit/user/:_id" element={<EditUser />} />
                  <Route path="edit/project/:_id" element={<EditProject/>} />
                </Route>
             
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </DarkContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
