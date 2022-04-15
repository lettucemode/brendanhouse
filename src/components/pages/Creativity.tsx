import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MissionStatement from '../MissionStatement';

function Creativity() {
  return (
    <Row className="mx-auto">
      <Col xs={10}>
        <Row>
          <MissionStatement highlight="creativity" />
        </Row>
        <Row>
          <h1>Thoughtful Creative Expression</h1>
        </Row>
        <Row className="mx-auto">
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
        </Row>
      </Col>
    </Row>
  );
}

export default Creativity;
