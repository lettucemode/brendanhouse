import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';

function App() {

  return (
    <Jumbotron>
      <h1>Brendan House</h1>
      <Image rounded src="Saint_brendan_german_manuscript.jpg" className="d-block mx-auto" />
      <span className="text-muted float-right">Hi Joanne</span>
    </Jumbotron>
  );
}

export default App;