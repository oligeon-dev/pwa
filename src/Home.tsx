import { Link } from 'react-router';
import InstallPWACustomPrompt from './InstallPWACustomPrompt';

function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <Link to='/'>pref</Link>
      <InstallPWACustomPrompt />
    </div>
  );
}

export default Home;
