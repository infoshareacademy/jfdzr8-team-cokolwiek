import { NavLink } from 'react-router-dom'

export const Nav = ({ isAuth, isAdmin }) => {

 return !isAuth ? false : (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Strona główna</NavLink>
        </li>
        {isAdmin && (
          <li>
            <NavLink to="/developers">Developerzy</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/contact">Kontakt</NavLink>
        </li>
      </ul>
    </nav>
  )
}
