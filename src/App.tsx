import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Switch, Route } from 'react-router-dom';
import Docs from './components/Docs';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthComponent } from './components/AuthComponent';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/docs/:id">
          <Docs />
        </Route>
        <Route path="/">
          <Jumbotron>
            <h1>Brendan House</h1>
            <Image rounded src="Saint_brendan_german_manuscript.jpg" className="d-block mx-auto" />
            <span className="text-muted float-right">Hi Joanne</span>
          </Jumbotron>
          {/* <Link to="/docs/42">Forty two</Link>
          <Link to="/docs/5">Five</Link>
          <Link to="/docs/3">Three</Link> */}
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
