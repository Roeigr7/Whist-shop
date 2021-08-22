import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPage from './Pages/AdminPage/AdminPage';
import HomePage from './Pages/HomePage/HomePage';
import StatsPage from './Pages/StatsPage/StatsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/admin' component={AdminPage} />
        <Route path='/stats' component={StatsPage} />
      </Switch>
    </Router>
  );
}

export default App;
