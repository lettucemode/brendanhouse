import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <div className="text-center py-3">
      <Container fluid>&copy; Copyright {new Date().getFullYear()} Brendan House</Container>
    </div>
  );
}

export default Footer;
