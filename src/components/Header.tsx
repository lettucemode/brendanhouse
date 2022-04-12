import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function Header() {
  let title = 'Brendan House';
  // if (location.pathname !== '/') {
  //   title += ' - ';
  //   if (location.pathname.startsWith('/prayer')) {
  //     title += 'Prayer & Worship';
  //   } else if (location.pathname.startsWith('/training')) {
  //     title += 'Training';
  //   } else if (location.pathname.startsWith('/vessels-of-honor')) {
  //     title += 'Vessels of Honor';
  //   } else if (location.pathname.startsWith('/community')) {
  //     title += 'Affectionate Community';
  //   } else if (location.pathname.startsWith('/creativity')) {
  //     title += 'Thoughtful Creative Expression';
  //   } else if (location.pathname.startsWith('/payments')) {
  //     title += 'Payments';
  //   } else if (location.pathname.startsWith('/docs')) {
  //     title += 'Documents';
  //   }
  // }

  return (
    <Container fluid style={{ marginBottom: '10px', paddingLeft: '0px', paddingRight: '0px' }}>
      <Navbar collapseOnSelect expand="lg" className="bh-navbar">
        <Navbar.Brand className="navbar-title">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto navbar-headings">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="prayer">
              Prayer
            </Nav.Link>
            <Nav.Link as={Link} to="training">
              Training
            </Nav.Link>
            <Nav.Link as={Link} to="vessels-of-honor">
              Vessels of Honor
            </Nav.Link>
            <Nav.Link as={Link} to="community">
              Community
            </Nav.Link>
            <Nav.Link as={Link} to="creativity">
              Thoughtful Creative Expression
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Header;
