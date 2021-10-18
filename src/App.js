import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        {/* <Auth /> */}
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignInPage} />
        <Route path="/signup" exact component={SignUpPage} />
      </Switch>
    </Router>
  );
}

export default App;
