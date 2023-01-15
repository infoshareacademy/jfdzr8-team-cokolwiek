import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ isAllowed, redirectPath = '/' }) => {
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />
}
