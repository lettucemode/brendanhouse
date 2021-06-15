import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Community() {
  return (
    <Container fluid>
      {/* main content */}
      <Row>
        <Col xs={10}>
          <p>
            <span style={{ fontWeight: 'bold' }}>
              Brendan House is a house of spiritual renewal for makers &amp; artists
            </span>{' '}
            devoted to joyful, utter abandonment to Jesus Christ through prayerful use of the graces of making and the
            arts. Rooted first in worship, we seek to pass on what we’ve been given by becoming deployable creative
            resources for the kingdom of God in the areas of healing and discipleship. We grow into this capacity in
            ourselves and others through corporate prayer, training,{' '}
            <span style={{ fontWeight: 'bold' }}>affectionate community</span>, and thoughtful creative expression.
          </p>
          <p>
            Brendan House is organized as a contemporary expression of a Celtic monastic community rather than a
            “church.” As such, our focus is on developing first mid-sized groups that are large enough for missional
            flexibility but small enough to still be personally known. These mid-sized groups may develop different
            emphases or personalities related to artistic needs/interests, but would come together regularly for
            celebration and corporate worship/community events.
          </p>
          <p style={{ fontStyle: 'italic' }}>
            Our active prayer is that out of this work grows an intentional community of practicing artists &amp;
            makers, witnessing to God’s glory and profound creative love through the four pillars of worship, training,
            affection for each other, and thoughtful creative expression. Some of us are discerning whether a portion of
            this community can be geographically based; that is, that we would choose to live in the same neighborhood
            in order to facilitate a depth of relationship and interaction not possible in a commuter scenario. We also
            hope in the future to have a Guest House.
          </p>
        </Col>

        {/* sidebar */}
        <Col className="why-sidebar">
          <p style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Join us for dinner!</p>
          Under development
        </Col>
      </Row>
    </Container>
  );
}

export default Community;
