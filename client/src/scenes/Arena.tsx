import Board from "../components/Board";
import { useAuth } from "../components/PrivatRoute";

function Arena() {
  // const { user, logout } = useAuth();
  const AuthContext = useAuth();
  // console.log(user);
  if (!AuthContext) {
    return;
  }
  const { user, logout } = AuthContext;
  return (
    <div>
      <p>Arena</p>
      {user && <p>User: {user.username}</p>}
      <button onClick={logout}>Logout</button>
      <Board />
    </div>
  )
}

export default Arena;
