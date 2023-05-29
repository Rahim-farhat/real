import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SpecificScreen from './screens/SpecificScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">MyApp</Link>
        </header>
        <main>
          <Routes>
            <Route path="/event/:slug" element={<SpecificScreen />} />
            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
