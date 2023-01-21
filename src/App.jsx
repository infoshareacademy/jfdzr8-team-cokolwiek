import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { EmployeeView } from './Pages/EmployeeView/EmployeeView'
import { useState } from 'react'
import { AdminEmployeesList } from './Pages/AdminEmployeesList/AdminEmployeesList'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminHome } from './Pages/AdminHome/AdminHome'
import { AdminPanel } from './Pages/AdminPanel/AdminPanel'
import { Header } from './layout/PageLayout/Header'
import { PageLayout } from './layout/PageLayout'
import { Footer } from './layout/PageLayout/Footer'
import { NotFound } from './layout/NotFound'

{/*tylko do testowania cruda do bazy*/}
import { Test } from './firebase/utils/test'

function App() {
  const [userId, setUserId] = useState(0)
  const [isAdmin, setAdmin] = useState(false)

  return (
    <BrowserRouter>
      <PageLayout 
      header = {<Header isAuth={userId!=0} />}
      footer = {<Footer />} >
        <Routes>
          {/* <Route element={<ProtectedRoute isAllowed={!userId} />}> */}
            <Route path="/login" element={<Login setUserId={setUserId} setAdmin={setAdmin}/>} />
          {/* </Route> */}
          {/* <Route element={<ProtectedRoute isAllowed={isAdmin} />}> */}
            <Route path="/AdminEmployeesList" element={<AdminEmployeesList />} />
            <Route path="/AdminPanel" element={<AdminPanel />} />
          {/* </Route> */}
          {/* <Route element={<ProtectedRoute isAllowed={userId} redirectPath="/login" />}> */}
            <Route path="/" element={isAdmin ? <AdminHome /> : <EmployeeView userId={userId}/>} />
          {/* </Route> */}
          <Route path="*" element={<NotFound />} />

          {/*tylko do testowania cruda do bazy*/}
          <Route path="/test" element={<Test />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )
}

export default App
