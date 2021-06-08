import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  let title = 'Brendan House';
  let location = useLocation();
  if (location.pathname !== '/') {
    title += ' - ';
    if (location.pathname.startsWith('/prayer')) {
      title += 'Prayer & Worship';
    } else if (location.pathname.startsWith('/training')) {
      title += 'Training';
    } else if (location.pathname.startsWith('/vessels-of-honor')) {
      title += 'Vessels of Honor';
    } else if (location.pathname.startsWith('/community')) {
      title += 'Affectionate Community';
    } else if (location.pathname.startsWith('/creativity')) {
      title += 'Thoughtful Creative Expression';
    }
  }

  return (
    <Container fluid>
      <Navbar collapseOnSelect expand="md" className="testing">
        <Navbar.Brand className="navbar-custom">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-custom">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Pages" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="prayer">
                Prayer
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="training">
                Training
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="vessels-of-honor">
                Vessels of Honor
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="community">
                Community
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="creativity">
                Creativity
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="construction">UNDER CONSTRUCTION</div>
    </Container>
  );
}

export default Header;
