import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/pages/Home';
import VesselsOfHonor from './components/pages/VesselsOfHonor';
import Training from './components/pages/Training';
import Prayer from './components/pages/Prayer';
import Community from './components/pages/Community';
import Creativity from './components/pages/Creativity';
import Payments from './components/pages/Payments';
import DocsGuard from './util/DocsGuard';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <>
      <Header />
      <Container fluid style={{ minHeight: '78vh' }}>
        <Switch>
          <DocsGuard path="/docs" />
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
          <Route path="/payments">
            <Payments />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default App;
