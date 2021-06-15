import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Training() {
  return (
    <Container fluid>
      <Row>
        <Col xs={10}>
          <p>
            <span style={{ fontWeight: 'bold' }}>
              Brendan House is a house of spiritual renewal for makers &amp; artists
            </span>{' '}
            devoted to joyful, utter abandonment to Jesus Christ through prayerful use of the graces of making and the
            arts. Rooted first in worship, we seek to pass on what we’ve been given by becoming deployable creative
            resources for the kingdom of God in the areas of healing and discipleship. We grow into this capacity in
            ourselves and others through corporate prayer, <span style={{ fontWeight: 'bold' }}>training</span>,
            affectionate community, and thoughtful creative expression.
          </p>
          <p>The training priorities for Brendan House are:</p>
          <ol>
            <li>
              Discipleship opportunities that are apprenticeship-based and organized around working with one’s hands
              rather than cognitive/academic models
            </li>
            <li>Spiritual growth and connection for artists distanced from the church (or de-churched)</li>
            <li>Exploratory options for artist curious about Christ but unwilling to engage “the Church”</li>
            <li>
              Healing prayer and spiritual direction training friendly to artistic practice, in addition to traditional
              models
            </li>
          </ol>
          <p>
            Brendan House is the ministry home of Vessels of Honor, a Spiritual Direction training program in the
            Anglican tradition dedicated to raising up and equipping spiritual companions and directors for kingdom
            service. For more information about Vessels of Honor, <Link to="/vessels-of-honor">click here</Link>.
          </p>
          <p>We also on a periodic basis offer:</p>
          <ul>
            <li>
              <span style={{ fontWeight: 'bold' }}>Pray with Your Hands</span>, an exploration of the ancient Ignatian
              spiritual exercises adapted for artists and makers
            </li>
            <li>
              <span style={{ fontWeight: 'bold' }}>Creativity &amp; Healing</span>, a six week workshop exploring the
              relationship between hurt, healing and creativity
            </li>
            <li>
              Brendan Vision Quest, a small group journey through the Brendan liturgy with a focus on discerning
              creative direction and partnership
            </li>
            <li>Individual and/or group discernment consultation/ spiritual direction appointments</li>
          </ul>
          <p>Check this space for the schedule of future offerings.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Training;
