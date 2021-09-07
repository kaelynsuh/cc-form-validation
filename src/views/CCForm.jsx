import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin: 2rem;
  padding: 2rem;
  width: 400px;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  /* text-align: center; */
`;

const NumberInput = styled(Input)`
  width: 80%;
`;

const Expiry = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const CCForm = () => {
  const [data, setData] = useState({
    name: '',
    card: '',
    cvv: '',
    expMonth: '',
    expYear: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    card: '',
    cvv: '',
    expMonth: '',
    expYear: '',
  });

  const [showForm, setShowForm] = useState(true);

  console.log('data MAIN: ', data);
  console.log('errors MAIN: ', errors);

  const onChange = (type) => (e) => {
    console.log('e.target.validity: ', e.target.validity);
    console.log('e.target.validationMessage: ', e.target.validationMessage);

    setData({
      ...data,
      [type]: e.target.value,
    });

    if (e.target.validationMessage) {
      setErrors({
        ...errors,
        [type]: e.target.validationMessage,
      });
    } else {
      delete errors[type];
    }
  };

  const onCardChange = (type) => (e) => {
    let value = e.target.value;
    let match = value.replace(/\s+/g, '');

    let errorMessage;
    if (value.length === 0) {
      errorMessage = 'Please fill out this field.';
    } else if (match.length < 16) {
      errorMessage = 'Invalid card number.';
    }

    let groups = [];
    for (let i = 0; i < match.length; i += 4) {
      groups.push(match.substring(i, i + 4));
    }

    if (groups.length) {
      setData({
        ...data,
        [type]: groups.join(' '),
      });
    } else {
      setData({
        ...data,
        [type]: match,
      });
    }

    if (errorMessage) {
      setErrors({
        ...errors,
        [type]: errorMessage,
      });
    } else {
      delete errors[type];
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setShowForm(false);
    console.log('data: ', data);
  };

  return (
    <Container>
      {showForm ? (
        <Form onSubmit={handleOnSubmit}>
          <h3>Enter your credit card information</h3>

          <Input
            type="text"
            name="name"
            id="name"
            // ref={nameRef}
            placeholder="Name"
            onChange={onChange('name')}
            // onChange={(e) => onNameChange('name', e.target.value)}
            pattern="^[a-zA-Z]*$"
            maxLength="40"
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

          <Input
            type="tel"
            name="card"
            id="card"
            placeholder="Card Number"
            value={data.card}
            onChange={onCardChange('card')}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            maxLength="19"
            required
          />
          {errors.card && <ErrorMessage>{errors.card}</ErrorMessage>}

          <Input
            type="text"
            name="cvv"
            id="cvv"
            placeholder="CVV2"
            onChange={onChange('cvv')}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            minLength="3"
            maxLength="4"
            required
          />
          {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}

          <Expiry>
            {/* <div> */}
            <div style={{ width: '50%' }}>
              <NumberInput
                // type="text"
                type="number"
                name="exp-month"
                id="exp-month"
                placeholder="Exp. Month"
                onChange={onChange('expMonth')}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={data.expMonth}
                min="1"
                max="12"
                maxLength="2"
                required
              />
              {errors.expMonth && (
                // <ErrorMessage style={{ width: '140px' }}>
                <ErrorMessage style={{ width: '90%' }}>
                  {errors.expMonth}
                </ErrorMessage>
              )}
            </div>

            {/* <div> */}
            <div
              style={{
                width: '50%',
                display: 'flex',
                alignItems: 'end',
                flexDirection: 'column',
              }}
            >
              <NumberInput
                // type="text"
                type="number"
                name="exp-year"
                id="exp-year"
                onChange={onChange('expYear')}
                placeholder="Exp. Year (YY)"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={data.expYear}
                min="21"
                max="99"
                maxLength="2"
                required
              />
              {errors.expYear && (
                <ErrorMessage style={{ width: '90%' }}>
                  {errors.expYear}
                </ErrorMessage>
              )}
            </div>
          </Expiry>

          <button type="submit" disabled={Object.keys(errors).length}>
            Submit
          </button>
        </Form>
      ) : (
        <h2>Your card has been succesfully added.</h2>
      )}
    </Container>
  );
};

export default CCForm;
