import { useState } from 'react';
import { useUser } from '../util/auth';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export function AuthComponent() {
  const { user, login, logout, completeNewPassword } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  // signed in, but this is the first time and a pw update/email is needed
  if (user && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    return (
      <Form>
        <Form.Text className="text-muted">You need to update your email and pick a new password.</Form.Text>
        <Form.Row>
          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="button" onClick={() => {
            completeNewPassword(email, newPassword);
          }}>Update</Button>
        </Form.Row>
      </Form>
    );
  } 
  
  // signed in, all good
  if (user && !user.challengeName) {
    return (
      <Form>
        <Form.Group as={Col} controlId="formSignedIn">
          <Form.Text className="text-muted">You are signed in as {user.username}.</Form.Text>
          <Button variant="primary" type="button" onClick={logout}>Sign out</Button>
        </Form.Group>
      </Form>
    );
  }
  
  // not signed in
  return (
    <Container className="h-100 d-flex justify-content-center align-items-center">
      <Form className="border p-2">
        <div>
          Sign in to access this page.
        </div>
        <Form.Row>
          <Form.Group as={Col} controlId="formUsername" className="align-self-center">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} xl={6} controlId="formPassword" className="align-self-center">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col className="col-md-auto">
            <Button variant="primary" type="button" onClick={() => {
              login(username, password);
            }}>Sign in</Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}