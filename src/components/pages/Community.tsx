import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import MissionStatement from '../MissionStatement';
import { useHistory } from 'react-router-dom';

function Community() {
  const history = useHistory();
  return (
    <>
      {/* main content */}
      <Row className="mx-auto">
        <Col xs={10}>
          <Row>
            <MissionStatement highlight="community" />
          </Row>
          <Row>
            <h1>Affectionate Community</h1>
          </Row>
          <Row className="mx-auto">
            <p>
              Brendan House is organized as a contemporary expression of a Celtic monastic community rather than a
              “church.” As such, our focus is on developing first mid-sized groups that are large enough for missional
              flexibility but small enough to still be personally known. These mid-sized groups may develop different
              emphases or personalities related to artistic needs/interests, but come together regularly for celebration
              and corporate worship/community events.
            </p>
            <p style={{ fontStyle: 'italic' }}>
              Our active prayer is that out of this work grows an intentional community of practicing artists &amp;
              makers, witnessing to God’s glory and profound creative love through the four pillars of worship,
              training, affection for each other, and thoughtful creative expression. Some of us are discerning whether
              a portion of this community can be geographically based; that is, that we would choose to live in the same
              neighborhood in order to facilitate a depth of relationship and interaction not possible in a commuter
              scenario.
            </p>
          </Row>
          <Row>
            <h3>Healing Center</h3>
          </Row>
          <Row className="mx-auto">
            <Col xs={6}>
              <p>
                Brendan House has a healing center that currently offers spiritual direction and healing prayer. We plan
                to add art therapy services in 2022.
              </p>
            </Col>
            <Col xs={4}>
              <Button variant="primary" onClick={() => history.push('/payments?paytype=spdirect')}>
                Healing Center Payment
              </Button>
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col xs={6}>
              <p>We also hope in the future to have a Guest House.</p>
            </Col>
          </Row>
        </Col>

        {/* sidebar */}
        {/* <Col className="why-sidebar">
          <p style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Join us for dinner!</p>
          Under development
        </Col> */}
      </Row>
    </>
  );
}

export default Community;
