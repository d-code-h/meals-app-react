import './App.css';
import { useGlobalContext } from './context';
// components
import Search from './components/Search';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';

function App() {
  const { favorites, showModal } = useGlobalContext();
  return (
    <div id="container">
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </div>
  );
}

export default App;
