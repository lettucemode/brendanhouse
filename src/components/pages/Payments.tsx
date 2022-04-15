import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useHistory } from 'react-router-dom';
import SquarePaymentComponent from '../SquarePaymentComponent';
import { SquarePayment } from '../../models/SquarePayment';
import FadeIn from '../../vendor/FadeIn';
import Spinner from 'react-bootstrap/Spinner';

function Payments() {
  const history = useHistory();
  let [paymentResult, setPaymentResult] = useState<SquarePayment>(null);

  const renderPaymentFormOrStatus = (): JSX.Element => {
    /* Main form */
    if (paymentResult === null) {
      return <SquarePaymentComponent setPaymentResult={setPaymentResult} />;
    }

    /* Spinner after button is clicked */
    if (paymentResult?.status === 'WAITING') {
      return (
        <FadeIn>
          <Container>
            <Row className="justify-content-md-center">
              <Spinner className="float-center" as="span" animation="border" variant="primary" />
            </Row>
          </Container>
        </FadeIn>
      );
    }

    /* Success screen after payment completes */
    if (paymentResult?.status === 'COMPLETED') {
      return (
        <FadeIn>
          <Container>
            <Row className="justify-content-md-center">
              Your payment completed successfully! Thank you for supporting Brendan House.
            </Row>
            <Row>
              Here's a&nbsp;
              <Link to={{ pathname: paymentResult.receiptUrl }} target="_blank">
                link to your receipt.
              </Link>
              &nbsp;Please hold onto it for your records.
            </Row>
          </Container>
        </FadeIn>
      );
    }

    /* Error screen after payment fails for some reason */
    if (paymentResult?.status === 'FAILED') {
      var errs: JSX.Element[] = paymentResult.cardDetails.errors.map((v) => <li>{v.detail}</li>);
      return (
        <FadeIn>
          <Container>
            <Row className="justify-content-md-center">Payment has failed with the following error(s):</Row>
            <Row className="justify-content-md-center">
              <ul>{errs}</ul>
            </Row>
            <Row className="justify-content-md-center">
              Please refresh the page, correct the issue, and try again. If you can't, contact us for support.
            </Row>
          </Container>
        </FadeIn>
      );
    }

    /* Catch all, some weird error happened */
    return (
      <FadeIn>
        <Container>
          <Row className="justify-content-md-center">
            An unexpected or unhandled situation occured. Please refresh the page and try your payment again. If the
            error persists, contact us for support.
          </Row>
        </Container>
      </FadeIn>
    );
  };

  return (
    <Container fluid style={{ minHeight: '78vh' }}>
      <Row>
        <Button variant="link" onClick={() => history.goBack()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>{' '}
          Go Back
        </Button>
      </Row>
      <Row>
        <h3 className="m-auto" style={{ paddingBottom: '20px' }}>
          Contribute to Brendan House
        </h3>
      </Row>
      <Row>
        <Col className="col-xl-5 col-lg-7 col-md-8 mx-auto">{renderPaymentFormOrStatus()}</Col>
      </Row>
    </Container>
  );
}

export default Payments;
