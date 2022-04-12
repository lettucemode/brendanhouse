import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormEvent, useState } from 'react';
import FadeIn from '../vendor/FadeIn';
import ContactService from '../services/contact';

const PREPARING = 0;
const SUBMITTED = 1;
const DONE = 2;

function Contact() {
  let [formStatus, setFormStatus] = useState<number>(PREPARING);
  let [contactFirstName, setContactFirstName] = useState<string>('');
  let [contactLastName, setContactLastName] = useState<string>('');
  let [contactEmail, setContactEmail] = useState<string>('');
  let [contactText, setContactText] = useState<string>('');

  const contactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus(SUBMITTED);
    await new ContactService().postContactForm(contactFirstName, contactLastName, contactEmail, contactText);
    setFormStatus(DONE);
  };

  const normalJsx = () => {
    return (
      <div className="mx-4">
        <Row className="ml-0 my-2">
          <h1 className="home-statement">Get in touch</h1>
        </Row>
        <Form onSubmit={contactSubmit}>
          <Form.Row className="mb-3">
            <Col>
              <Form.Control
                required
                type="text"
                placeholder="Your first name"
                value={contactFirstName}
                onChange={(e) => setContactFirstName(e.target.value)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                required
                type="text"
                placeholder="Your last name"
                value={contactLastName}
                onChange={(e) => setContactLastName(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="mb-3">
            <Col>
              <Form.Control
                required
                type="email"
                placeholder="Your email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="mb-3">
            <Col>
              <Form.Control
                required
                as="textarea"
                placeholder="What are you contacting us about?"
                style={{ height: '120px' }}
                value={contactText}
                onChange={(e) => setContactText(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="mb-3">
            <Col>
              <Button variant="primary" type="submit" disabled={formStatus === SUBMITTED}>
                {formStatus === PREPARING ? 'Submit' : 'Sending...'}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  };

  const doneJsx = () => {
    return (
      <div className="mx-4">
        <Row className="ml-0 my-2">
          <h1 className="home-statement">Get in touch</h1>
        </Row>
        <FadeIn>
          <Col>
            <Row className="my-3 justify-content-center">
              <p>Thank you for contacting us!</p>
            </Row>
            <Row className="my-3 justify-content-center">
              <p>We'll be in touch.</p>
            </Row>
          </Col>
        </FadeIn>
      </div>
    );
  };

  if (formStatus < DONE) return normalJsx();
  else return doneJsx();
}

export default Contact;
