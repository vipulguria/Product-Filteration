import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/homepage/Home';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <div class="container">
        <Navbar />
        <div class="row justify-content-start">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
