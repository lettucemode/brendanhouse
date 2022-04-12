import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import MissionStatement from '../MissionStatement';

function Training() {
  return (
    <Row className="mx-auto">
      <Col xs={10}>
        <Row>
          <MissionStatement highlight="training" />
        </Row>
        <Row>
          <h1>Training</h1>
        </Row>
        <Row className="mx-auto">
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
        </Row>
      </Col>
    </Row>
  );
}

export default Training;
