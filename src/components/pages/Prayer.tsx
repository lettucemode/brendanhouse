import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MissionStatement from '../MissionStatement';

function Prayer() {
  return (
    <Row className="mx-auto">
      <Col xs={10}>
        <Row>
          <MissionStatement highlight="prayer" />
        </Row>
        <Row>
          <h1>Corporate Prayer</h1>
        </Row>
        <Row className="mx-auto">
          <p>
            If you compare Brendan House to a living organism, then prayer is its skeleton. The patterns of worship and
            programming at the House are built around the ancient Christian practice of “praying the hours,” that is,
            following set times of prayer throughout the day. In our contemporary interpretation, these are the times we
            hold open studio, Art &amp; Prayer meditations, and offer our prayers through the use of our hands (or
            bodies) in developing creative, visual and/or performance art pieces. In other words, the making of our
            craft is the form of our praying during the prayers at Brendan House.
          </p>
          <p>
            Creativity and creative work are themes of every initiative of Brendan House, and the leadership team
            members are encouraged to maintain their own artistic practice as an aspect of their pastoral ministry.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Our initial goal is to implement a sustainable rhythm of praying the hours that is supported by and
              hospitable to concurrent creative practice, understanding making{' '}
              <span style={{ fontStyle: 'italic' }}>as an expression of worship itself</span>, not an adjunct to it.
            </span>
          </p>
          <p style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Summer Prayer / Open Studio Times</p>
          <p style={{ marginLeft: '40px' }}>Under construction - check back soon</p>
          <p style={{ fontStyle: 'italic' }}>
            It is our hope that, in time, a community will form for whom Brendan House is their primary worship home.
          </p>
        </Row>
      </Col>
    </Row>
  );
}

export default Prayer;
