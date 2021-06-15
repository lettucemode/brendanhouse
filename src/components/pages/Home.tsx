import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container fluid>
      <Row>
        {/* main page content */}
        <Col xs={10}>
          <p style={{ fontWeight: 'bold' }}>A house of spiritual renewal for makers &amp; artists...</p>
          <p style={{ marginLeft: '40px' }}>
            …devoted to joyful, utter abandonment to Jesus Christ through prayerful use of the graces of making and the
            arts. Rooted first in worship, we seek to pass on what we’ve been given by becoming deployable creative
            resources for the kingdom of God in the areas of healing and discipleship. We grow into this capacity in
            ourselves through four means:
          </p>
          <Link style={{ marginLeft: '40px' }} to="/prayer">
            Corporate Prayer &amp; Worship
          </Link>
          <br />
          <Link style={{ marginLeft: '40px' }} to="/training">
            Training
          </Link>
          , including <Link to="/vessels-of-honor">Vessels of Honor</Link>
          , a spiritual direction training program in the Anglican Tradition
          <br />
          <Link style={{ marginLeft: '40px' }} to="/community">
            Affectionate Community
          </Link>
          <br />
          <Link style={{ marginLeft: '40px' }} to="/creativity">
            Creativity
          </Link>
        </Col>

        {/* sidebar */}
        <Col className="why-sidebar">
          <p style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Why Brendan?</p>
          Under construction
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
