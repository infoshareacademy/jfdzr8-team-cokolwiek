import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { EmployeeView } from "./components/EmployeeView";
import { useState, useEffect } from "react";
import { AdminEmployeesList } from "./components/AdminEmployeesList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminHome } from "./components/AdminHome";
import { AdminPanel } from "./components/AdminPanel";
import { Header } from "./layout/Header";
import { PageLayout } from "./layout/PageLayout";
import { Footer } from "./layout/Footer";
import { NotFound } from "./layout/NotFound";
import { auth } from "./firebase/firebase";
import { getUsersByEmail } from "./firebase/utils/functions";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AdminMenu } from "./components/AdminMenu";


{
  /*tylko do testowania cruda do bazy*/
}
import { Test } from "./firebase/utils/test";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(true);
  

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("Auth api user", authUser);
      if (authUser) {
        getUsersByEmail(authUser.email).then((data) => {
          const users = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUser(users.length == 1 ? users[0] : null);
          console.log("App user", users[0]);
          setIsLoading(false);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
    console.log("effect");
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <BrowserRouter>
      {console.log("render", user)}
      <PageLayout header={<Header user={user} />} footer={<Footer />} menu={ user?.isAdmin ? <AdminMenu /> : null }>
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!user} />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={user?.isAdmin} />}>
            <Route
              path="/AdminEmployeesList"
              element={<AdminEmployeesList />}
            />
            <Route path="/AdminPanel" element={<AdminPanel />} />
          </Route>
          <Route
            element={<ProtectedRoute isAllowed={user} redirectPath="/login" />}
          >
            <Route
              path="/"
              element={
                user?.isAdmin ? <AdminHome /> : <EmployeeView user={user} />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />

          {/*tylko do testowania cruda do bazy*/}
          <Route path="/test" element={<Test />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
