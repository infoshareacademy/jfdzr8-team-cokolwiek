import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Login } from './components/Login'
import { EmployeeView } from './components/EmployeeView'
import { useState } from 'react'
import { AdminEmployeesList } from './components/AdminEmployeesList'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminHome } from './components/AdminHome'
import { AdminPanel } from './components/AdminPanel'
import { Nav } from './components/Nav'

function App() {
  const [userId, setUserId] = useState(0)
  const [isAdmin, setAdmin] = useState(false)

  return (
    <BrowserRouter>
      <Nav isAuth={userId} isAdmin = {isAdmin}/>

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

        <Route path="*" element={<h2>Strona nie istnieje...</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
