import { Switch, Route } from 'react-router-dom';
import Payments from './components/pages/Payments';
import UnderConstruction from './components/pages/UnderConstruction';

function App() {
  return (
    <>
      <Switch>
        <Route path='/payments'>
          <Payments />
        </Route>
        <Route path='/'>
          <UnderConstruction />
        </Route>
      </Switch>
    </>
  );
}

export default App;
