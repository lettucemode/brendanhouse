import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Creativity() {
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
            ourselves and others through corporate prayer, training, affectionate community, and{' '}
            <span style={{ fontWeight: 'bold' }}>thoughtful creative expression</span>.
          </p>
          <p>
            Creativity and creative work are themes of every initiative of Brendan House, and the leadership team
            members are encouraged to maintain their own artistic practice as an aspect of their pastoral ministry.
          </p>
          <p>
            Our initial goal is to implement a sustainable rhythm of praying the hours that is supported by and
            hospitable to concurrent creative practice, understanding making as an expression of worship itself, not an
            adjunct to it.
          </p>
          <div style={{ fontStyle: 'italic' }}>
            <p>Future hopes:</p>
            <ol>
              <li>Communal art residency</li>
              <li>Maker space</li>
              <li>A healing center offering healing prayer, spiritual direction, art therapy and related ministry</li>
              <li>
                A gift shop/gallery to contribute to the economic health of the members of the Brendan House community
                and invited guests
              </li>
              <li>
                The development of The Company of the Prophets, an initiative which understands, explores, and
                encourages artistic practice as a modality of prophetic expression within the Anglican church
              </li>
            </ol>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Creativity;
