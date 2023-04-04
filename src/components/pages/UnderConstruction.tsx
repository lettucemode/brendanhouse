import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Contact from '../Contact';
import { Container } from 'react-bootstrap';

function UnderConstruction() {
  return (
    <Container>
      <Row
        style={{ height: '400px' }}
        className='contact-container align-items-center justify-content-center'
      >
        <p className='text-center'>
          BrendanHouse.com is currently under construction.
          <br />
          <br />
          <span style={{ fontSize: 14 }}>
            Looking for the payments page? Click <Link to='/payments'>here</Link>.
          </span>
        </p>
      </Row>
    </Container>
  );
}

export default UnderConstruction;
