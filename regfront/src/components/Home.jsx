import { useNavigate } from "react-router";
import Login from "./Login";


const Home = () => {

  const navigateTo = useNavigate();

  return (
    <div>
      <h1>Tuntikirjauspalvelu</h1>
      <p>Kirjaudu sisään tai Rekisteröidy</p>
      <Login />
      <button onClick={() => navigateTo('/register')}>Rekisteröidy</button>
    </div>
  );
}

export default Home;