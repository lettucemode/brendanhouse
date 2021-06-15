import { Switch, Route } from 'react-router-dom';
import Docs from './components/Docs';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/pages/Home';
import VesselsOfHonor from './components/pages/VesselsOfHonor';
import Training from './components/pages/Training';
import Prayer from './components/pages/Prayer';
import Community from './components/pages/Community';
import Creativity from './components/pages/Creativity';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/docs">
          <Docs />
        </Route>
        <Route path="/prayer">
          <Prayer />
        </Route>
        <Route path="/training">
          <Training />
        </Route>
        <Route path="/vessels-of-honor">
          <VesselsOfHonor />
        </Route>
        <Route path="/community">
          <Community />
        </Route>
        <Route path="/creativity">
          <Creativity />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
