import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useUser } from "../util/auth";
import { AuthComponent } from "./AuthComponent";

const withAuth = (Component: any) => (props: any) => {
  const { user, logout } = useUser();
  if (!user) {
    return <AuthComponent />;
  }
  return (
    <>
      <Component {...props} />

      { /* sign out component */ }
      <Form>
        <Form.Group as={Col} controlId="formSignedIn">
          <Form.Text className="text-muted">You are signed in as {user.username}.</Form.Text>
          <Button variant="primary" type="button" onClick={logout}>Sign out</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default withAuth;