import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function VesselsOfHonor() {
  return (
    <Container fluid>
      <Row>
        {/* main page content */}
        <Col xs={10}>
          <Row>
            <Col />
            <Col xs={10}>
              <div style={{ borderStyle: 'solid', textAlign: 'center' }}>
                <span style={{ fontSize: '2em', fontWeight: 'bold' }}>Vessels of Honor</span>
                <p>
                  A Spiritual Direction training program in the Anglican tradition, dedicated to raising up and
                  equipping spiritual companions and directors for kingdom service
                </p>
              </div>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col xs={8}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '1.8em' }}>"Remember Jesus Christ, risen from the dead..."</span>{' '}
                <span style={{ fontSize: '1.4em' }}>2 Tim 2:8</span>
              </div>
            </Col>
            <Col />
          </Row>
          <p>
            In 2020, The Anglican Diocese of Pittsburgh began a pilot program to discern the viability of an on-going
            spiritual direction training program within the diocese. The first two-year cohort began in August 2020 and
            continues to meet. When the Diocese entered a transitional period to search for a new bishop, a ministry
            called Brendan House took on oversight and administration of the Vessels of Honor program.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Vessels of Honor is now accepting applications for a second cohort to begin August 2021 to prepare
              individuals spiritually and practically for service in the ministries of spiritual direction and
              companioning.
            </span>
          </p>
          <p>
            The cohort structure and curriculum have been built on the foundation of five core values:
            <ul>
              <li>Trinitarian worship: Father, Son and Holy Spirit</li>
              <li>Servanthood (service in community)</li>
              <li>An ethos of gentleness and humility</li>
              <li>Competence</li>
              <li>Formation and readiness for ministry</li>
            </ul>
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Cohort Structure/Schedule:</span> The program is a combination of
            every-other-month in-person Weekend Intensives (Friday-Saturday, 9 am-5pm), with ten readings and related
            assignments in-between (averaging one book and two reflections per month). The schedule format is designed
            to build community and allow participants to come together for two days/ month, without being overly
            burdensome on their everyday lives. Participants are also required to be in direction and will begin sitting
            with directees, under supervision, during Year One. The cohort size will be 6-12 members. Generally
            speaking,
            <ul>
              <li>
                Year One focuses on personal formation/ readiness, relationship with the Lord, introduction to
                practices, and skill development.
              </li>
              <li>
                Year Two deepens Year One with an emphasis on deepening discernment skills, theological grounding and
                formation practices.
              </li>
              <li>
                Applicants who are interested in developing their skills in spiritual companioning, but are unsure about
                vocational ministry as a director, are invited to apply for Year One.
              </li>
              <li>
                Applicants who are interested in or feeling called to the vocational ministry of spiritual direction are
                strongly encouraged to apply for both years. Though all applications will be considered, this pilot
                cohort will strongly preference participants willing to make a two year commitment.
              </li>
            </ul>
          </p>
          <Row>
            <Col xs={2} />
            <Col xs={4}>
              <p>
                <span style={{ textDecorationLine: 'underline' }}>Year One 2021-2022</span>
                <br />
                Sep 10-11, 2021 (overnight)
                <br />
                Nov 12-13, 2021
                <br />
                Jan 21-22, 2022
                <br />
                Mar 11-12, 2022
                <br />
                May 13-14, 2022
              </p>
            </Col>
            <Col xs={4}>
              <p>
                <span style={{ textDecorationLine: 'underline' }}>
                  Year Two 2022-2023 (likely dates; to be confirmed)
                </span>
                <br />
                Aug 19-20, 2022 (overnight)
                <br />
                Oct 14-15, 2022
                <br />
                Dec 9-10, 2022
                <br />
                Feb 17-18, 2023
                <br />
                Apr 14-15, 2023
              </p>
            </Col>
            <Col xs={2} />
          </Row>
          <p>
            <span style={{ fontWeight: 'bold' }}>Curriculum:</span> The curriculum design is an interweaving of three
            strands: personal formation (including practice being in God’s presence), skill building, and a knowledge
            base, including theological grounding, for the ministry of spiritual companioning/direction. These strands
            are unfolded in conversation with the elements of “The Great Tradition”: liturgy, church history,
            sacramental theology, and, as Anglicans, the Prayer Book tradition. The community context created by the
            weekend intensives is essential to the program. In other words, this training is not about “head knowledge,”
            or “conceptual teaching.” It is about forming who the participant is, in preparation to serve in a
            particular way in the wider ministry of the church.
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Outcomes:</span> The purpose of the program is to serve the church and
            the kingdom of God by raising up leaders called to the particular ministries of companioning and spiritual
            direction. The curriculum is designed to provide participants with the personal, spiritual readiness and
            practical tools necessary to establish a ministry of spiritual direction. A “Certificate of Completion” will
            be given at the end of Year Two.
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Tuition/Payment:</span> The cost of the program is $2400 per year.
            Tuition includes the Opening Retreat, lunches during cohort weekends, and group supervision. Travel, books,
            and the participant’s own direction are not part of the tuition.
          </p>
          <p>
            There is a $50 application fee, which will be applied toward the total cost for applicants who are accepted
            to the program. A $250 deposit is due upon acceptance to the program. The remainder of the tuition can be
            paid in full prior to the Opening Retreat, or an installment payment plan is available.
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Application Process:</span> In the near future, the application and all
            information about Vessels of Honor will be available on the Brendan House website,{' '}
            <Link to="/">www.brendanhouse.com</Link>. Until its completion, the application is available by email by
            contacting The Rev. Canon Joanne Martin at{' '}
            <a href="mailto:cn.joanne.martin@gmail.com">cn.joanne.martin@gmail.com</a>. Applications are accepted on an
            on-going basis until the cohort is full, with a goal of interviewing all applicants and notifying those
            accepted by end of June.{' '}
            <span style={{ fontWeight: 'bold' }}>
              All applications will be fully considered, though priority consideration will be given to male applicants
              and those intending to serve in the Anglican Diocese of Pittsburgh. This priority is because these are the
              most urgent needs in our diocese at this time.
            </span>
          </p>
          <p>
            The ideal candidate for this pilot cohort is someone who:
            <ol>
              <li>Has demonstrated a clear commitment to Jesus Christ and a lively faith</li>
              <li>Already has some sort of demonstrable Scripture/prayer practice</li>
              <li>Already has some experience in mentoring/discipling others</li>
              <li>Is established/participating regularly in a worshipping community</li>
            </ol>
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Questions?</span> Please contact The Rev. Canon Joanne Martin at{' '}
            <a href="mailto:cn.joanne.martin@gmail.com">cn.joanne.martin@gmail.com</a>
          </p>
          <Row>
            <Col xs={1} />
            <Col xs={3}>
              <Card style={{ width: '100%' }}>
                <Card.Body>
                  <Card.Title>Current Year 1 Cohort Participants</Card.Title>
                  <Button variant="primary">Reflections Dropbox</Button>
                  <Button variant="secondary">Cohort Resources</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={1} />
            <Col xs={3}>
              <Card style={{ width: '100%' }}>
                <Card.Body>
                  <Card.Title>Current Year 2 Cohort Participants</Card.Title>
                  <Button variant="primary">Reflections Dropbox</Button>
                  <Button variant="secondary">Cohort Resources</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={1} />
            <Col xs={3}>
              <Card style={{ width: '100%' }}>
                <Card.Body>
                  <Card.Title>Make a Tuition Payment</Card.Title>
                  <Button variant="primary">Make Payment</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={1} />
          </Row>
        </Col>

        {/* sidebar */}
        <Col className="why-sidebar">
          <p style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Resources</p>
          Under construction
        </Col>
      </Row>
    </Container>
  );
}

export default VesselsOfHonor;
