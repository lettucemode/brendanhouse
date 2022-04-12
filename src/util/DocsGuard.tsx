import Docs from '../components/pages/Docs';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom';
import DocsService, { DocsAuthStatus } from '../services/docs';
import FadeIn from '../vendor/FadeIn';

function DocsGuard({ ...rest }) {
  const [isDocsAuthd, setIsDocsAuthd] = useState<boolean>(false);
  const [authdCohort, setAuthdCohort] = useState<number>(0);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const docsService = useMemo(() => new DocsService(), []);

  useEffect(() => {
    const getStatus = async () => {
      setIsLoggingIn(true);
      const status: DocsAuthStatus = await docsService.getAuthStatus();
      setIsDocsAuthd(status.docs_auth);
      setAuthdCohort(status.cohort);
      setIsLoggingIn(false);
    };
    getStatus();
  }, [docsService]);

  const submitButtonClick = async () => {
    setIsLoggingIn(true);
    const status: DocsAuthStatus = await docsService.passwordLogin(password);
    setIsDocsAuthd(status.docs_auth);
    setAuthdCohort(status.cohort);
    setIsLoggingIn(false);
  };

  const render = (): JSX.Element => {
    if (isDocsAuthd && !isLoggingIn) return <Docs cohort={authdCohort} />;
    return (
      <FadeIn delay={550}>
        <Container style={{ minHeight: '167px' }}>
          <Row className="justify-content-center" style={{ marginTop: '35px' }}>
            <Col md={6}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitButtonClick();
                }}
              >
                <Row className="justify-content-center">
                  <Form.Label>This page is password-protected.</Form.Label>
                </Row>
                <Row>
                  <Col md={1} />
                  <Col>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Control
                        type="text"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button style={{ minWidth: '130px' }} disabled={isLoggingIn} onClick={submitButtonClick}>
                      {isLoggingIn ? 'Logging in...' : 'Submit'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </FadeIn>
    );
  };

  return <Route {...rest} render={render} />;
}

export default DocsGuard;
