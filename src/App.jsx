import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { EmployeeView } from "./components/EmployeeView";
import { useState } from "react";
import { AdminEmployeesList } from "./components/AdminEmployeesList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminHome } from "./components/AdminHome";
import { AdminPanel } from "./components/AdminPanel";
import { Header } from "./layout/Header";
import { PageLayout } from "./layout/PageLayout";
import { Footer } from "./layout/Footer";
import { NotFound } from "./layout/NotFound";
import LoginPage from "./layout/LoginPage/LoginPage";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

{
  /*tylko do testowania cruda do bazy*/
}
import { Test } from "./firebase/utils/test";

function App() {
  const [userId, setUserId] = useState(0);
  const [isAdmin, setAdmin] = useState(false);

  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!userId} />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={isAdmin} />}>
            <Route
              path="/AdminEmployeesList"
              element={<AdminEmployeesList />}
            />
            <Route path="/AdminPanel" element={<AdminPanel />} />
          </Route>
          <Route
            element={
              <ProtectedRoute isAllowed={userId} redirectPath="/login" />
            }
          >
            <Route
              path="/"
              element={
                isAdmin ? <AdminHome /> : <EmployeeView userId={userId} />
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
