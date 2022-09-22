import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Contact from "../Contact";

function Home() {
  return (
    <Row>
      {/* main page content*/}
      <Col lg={8}>
        <Row>
          {/* text and such */}
          <Row className="mt-4 mx-3">
            <h1 className="text-bold text-center">
              A house of spiritual renewal for makers &amp; artists...
            </h1>
          </Row>
          <Row className="mt-2 mx-4">
            <p>
              …devoted to joyful, utter abandonment to Jesus Christ through prayerful use of the graces of
              making and the arts. Rooted first in worship, we seek to pass on what we’ve been given by
              becoming deployable creative resources for the kingdom of God in the areas of healing and
              discipleship. We grow into this capacity in ourselves through four means:
            </p>
          </Row>
          <div className="mx-5">
            <Link style={{ marginLeft: "40px" }} to="/prayer">
              Corporate Prayer &amp; Worship
            </Link>
            <br />
            <Link style={{ marginLeft: "40px" }} to="/training">
              Training
            </Link>
            , including <Link to="/vessels-of-honor">Vessels of Honor</Link>
            , a spiritual direction training program in the Anglican Tradition
            <br />
            <Link style={{ marginLeft: "40px" }} to="/community">
              Affectionate Community
            </Link>
            <br />
            <Link style={{ marginLeft: "40px" }} to="/creativity">
              Thoughtful Creative Expression
            </Link>
          </div>
        </Row>

        <Row className="mt-4 mx-3">
          <p>
            Brendan House is led by Canon Joanne Martin with a team of like-minded adventurers. For more
            information about Brendan House or the Vessels of Honor training program, please fill out the
            contact form below.
          </p>
        </Row>

        <Row className="contact-container">
          <Col>
            <Contact />
          </Col>
          <Col lg={1} />
        </Row>
      </Col>

      {/* sidebar */}
      <Col className="sidebar">
        <p className="sidebar-heading">Why Brendan?</p>
        <div className="sidebar-text">
          <p>
            Brendan was a real person who lived in Ireland in the late 400's ce. He was a monk, best known for
            setting out on a sea voyage to find the Promised Land...even though he didn't know where it was!
            Most ancient pilgrims set out with a specific destination in mind. Brendan went in response to a
            vision. His story, and that of the small community that accompanied him, is told in an ancient
            text called
            <i> The Voyage of St. Brendan</i>. He is the model for Brendan House because:
          </p>
          <ul>
            <li>
              Of his obedience to a vision, responding to an urge to go even when he didn't know the way
            </li>
            <li>His trust in God that allowed him to take great risks</li>
            <li>His openness to joy and adventure</li>
            <li>The faithful patterns of worship kept by him and the small community that accompanied him</li>
            <li>
              Of the way he was changed by his voyage, and how he returned to share what he'd seen with the
              people he'd left behind
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
}

export default Home;
