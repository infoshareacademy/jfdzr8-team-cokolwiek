import { signInWithGoogle } from '../firebase/utils/functions'

export const Login = () => {  
    return (
      <div>
      <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
    </div>
    )
  }