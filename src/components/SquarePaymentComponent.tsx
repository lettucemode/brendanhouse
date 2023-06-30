import { useEffect, useRef, useState } from 'react';
import { SquareService } from '../services/square';
import EmailService from '../services/email';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { SquarePayment, SquareResponse } from '../models/SquarePayment';
import FadeIn from '../vendor/FadeIn';
import { useLocation } from 'react-router';

const PAYTYPE_NONE = 0;
const PAYTYPE_APPLICATION = 1;
const PAYTYPE_DEPOSIT = 2;
const PAYTYPE_TUITION = 3;
const PAYTYPE_DONATION = 4;
const PAYTYPE_SPDIRECT = 5;
const PAYTYPE_RTHOUSE = 6;

async function tokenize(paymentMethod: any) {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === 'OK') {
    return tokenResult.token;
  }
  let errorMessage = `Tokenization failed - status ${tokenResult.status}`;
  if (tokenResult.errors) {
    errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
  }
  console.log(errorMessage);
  return null;
}

function SquarePaymentComponent({ setPaymentResult }) {
  const appId = process.env.REACT_APP_SQUARE_APP_ID;
  const locId = process.env.REACT_APP_SQUARE_LOC_ID;

  const params = new URLSearchParams(useLocation().search);
  const paytype_param = params.get('paytype');

  let [payerFirstName, setPayerFirstName] = useState<string>('');
  let [payerLastName, setPayerLastName] = useState<string>('');
  let [payerEmail, setPayerEmail] = useState<string>('');
  let [card, setCard] = useState<any>({});
  let [amount, setAmount] = useState<string>('');
  let [paymentType, setPaymentType] = useState<number>(
    paytype_param === 'spdirect' ? PAYTYPE_SPDIRECT : PAYTYPE_NONE
  );
  let [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const formRef = useRef(null);

  useEffect(() => {
    const initCard = async (payments: any) => {
      try {
        const c = await payments.card();
        await c.attach('#card-container');
        setCard(c);
      } catch (e) {
        console.error('Initializing Square card failed', e);
      }
    };
    if (!window.Square) {
      throw new Error('Square.js failed to load properly!');
    }
    const payments = window.Square.payments(appId, locId);
    initCard(payments);
  }, [appId, locId]);

  const validateFname = (): boolean => {
    const valid = payerFirstName !== '';
    return valid;
  };

  const validateLname = (): boolean => {
    const valid = payerLastName !== '';
    return valid;
  };

  const validateEmail = (): boolean => {
    const valid = payerEmail !== '';
    return valid;
  };

  const validatePtype = (): boolean => {
    const valid = paymentType !== PAYTYPE_NONE;
    return valid;
  };

  const validateAmount = (): boolean => {
    const valid = amount !== '';
    return valid;
  };

  const validateFields = (): boolean => {
    const fv = validateFname();
    const lv = validateLname();
    const ev = validateEmail();
    const pv = validatePtype();
    const av = validateAmount();
    return fv && lv && ev && pv && av;
  };

  return (
    <FadeIn delay={825}>
      <Form noValidate id='payment-form' ref={formRef} className='payment-background'>
        <Form.Row>
          <Col>
            <Form.Control
              type='text'
              placeholder='First name'
              value={payerFirstName}
              onChange={(e) => setPayerFirstName(e.target.value)}
              isInvalid={!validateFname() && buttonClicked}
            ></Form.Control>
          </Col>
          <Col>
            <Form.Control
              type='text'
              placeholder='Last name'
              value={payerLastName}
              onChange={(e) => setPayerLastName(e.target.value)}
              isInvalid={!validateLname() && buttonClicked}
            ></Form.Control>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control
              type='email'
              placeholder='Email'
              value={payerEmail}
              onChange={(e) => setPayerEmail(e.target.value)}
              isInvalid={!validateEmail() && buttonClicked}
            ></Form.Control>
          </Col>
          <Col>
            <Form.Control
              as='select'
              value={paymentType}
              onChange={(e) => {
                const ptype = +e.target.value;
                let amt = '';
                if (ptype === PAYTYPE_APPLICATION) amt = '50';
                else if (ptype === PAYTYPE_DEPOSIT) amt = '250';
                setAmount(amt);
                setPaymentType(+e.target.value);
              }}
              isInvalid={!validatePtype() && buttonClicked}
            >
              <option value={PAYTYPE_NONE}>Choose payment type</option>
              <option value={PAYTYPE_APPLICATION}>Application Fee - $50</option>
              <option value={PAYTYPE_DEPOSIT}>Deposit - $250</option>
              <option value={PAYTYPE_TUITION}>Tuition Payment</option>
              <option value={PAYTYPE_SPDIRECT}>Spiritual Direction</option>
              {/* <option value={PAYTYPE_DONATION}>Donation</option> */}
              <option value={PAYTYPE_RTHOUSE}>Retreat House</option>
            </Form.Control>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                placeholder='Amount'
                disabled={
                  paymentType !== PAYTYPE_TUITION &&
                  paymentType !== PAYTYPE_DONATION &&
                  paymentType !== PAYTYPE_SPDIRECT &&
                  paymentType !== PAYTYPE_RTHOUSE
                }
                value={amount}
                onChange={(e) => {
                  if (e.target.value === '') {
                    setAmount(e.target.value);
                    return;
                  }
                  let num: number = +e.target.value;
                  if (isNaN(num)) {
                    return;
                  }
                  if (num < 0) {
                    return;
                  }
                  if (e.target.value.includes('.')) {
                    setAmount(e.target.value.substr(0, e.target.value.indexOf('.') + 3));
                  } else {
                    num = Math.trunc(num * 100) / 100;
                    setAmount(String(num));
                  }
                }}
                isInvalid={!validateAmount() && buttonClicked}
              />
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Group style={{ marginTop: '25px' }}>
          <div id='card-container'></div>
        </Form.Group>
        <Form.Row>
          <Col className='text-right'>
            <Form.Text className='text-muted'>
              We store your name &amp; email in Square to keep track of payments and send receipts.
            </Form.Text>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button
              variant='primary'
              id='card-button'
              className='float-right my-2'
              onClick={async () => {
                // validation checks
                setButtonClicked(true);
                const allValid = validateFields();
                const token = await tokenize(card);
                if (isNaN(+amount) || +amount === 0) {
                  return;
                }
                if (token == null) return;
                if (!allValid) return;

                // send the payment
                setPaymentResult({ status: 'WAITING' } as SquarePayment);
                const resp: SquareResponse = await new SquareService().postPayment(
                  token,
                  payerFirstName,
                  payerLastName,
                  payerEmail,
                  +amount * 100,
                  paymentType
                );
                setPaymentResult(resp.payment);
                if (resp.payment.status === 'COMPLETED') {
                  new EmailService().postReceiptEmail(payerEmail, resp.payment.receiptUrl);
                }
              }}
            >
              Make Payment
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </FadeIn>
  );
}

export default SquarePaymentComponent;
