import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Login } from './components/Login'
import { EmployeeView } from './components/EmployeeView'
import { useState } from 'react'
import { AdminEmployeesList } from './components/AdminEmployeesList'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminHome } from './components/AdminHome'
import { AdminPanel } from './components/AdminPanel'
import { Header } from './layout/Header'
import { PageLayout } from './layout/PageLayout'
import { Footer } from './layout/Footer'
import { NotFound } from './layout/NotFound'

function App() {
  const [userId, setUserId] = useState(0)
  const [isAdmin, setAdmin] = useState(false)

  return (
    <BrowserRouter>
      <PageLayout 
      header = {<Header isAuth={userId!=0} />}
      footer = {<Footer />} >
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!userId} />}>
            <Route path="/login" element={<Login setUserId={setUserId} setAdmin={setAdmin}/>} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={isAdmin} />}>
            <Route path="/AdminEmployeesList" element={<AdminEmployeesList />} />
            <Route path="/AdminPanel" element={<AdminPanel />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={userId} redirectPath="/login" />}>
            <Route path="/" element={isAdmin ? <AdminHome /> : <EmployeeView userId={userId}/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )
}

export default App
