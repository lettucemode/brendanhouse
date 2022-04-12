import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <footer className="text-center py-3 px-0">
      <Container fluid>&copy; Copyright {new Date().getFullYear()} Brendan House</Container>
    </footer>
  );
}

export default Footer;
