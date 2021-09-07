import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import ErrorIcon from './ErrorIcon';

import amex from '../assets/images/amex.png';
import visa from '../assets/images/visa.png';
import card from '../assets/images/card.png';

const H3 = styled.h3`
  font-weight: 600;
`;

const Button = styled.button`
  border: 1px solid transparent;
  color: #fff;
  cursor: pointer;
  background-color: #3984f3;
  line-height: 1.5rem;
  padding: 0.2rem 0.75rem;
  text-transform: uppercase;

  &:hover {
    background-color: #1a70f0;
  }

  &:disabled {
    background-color: #94bbf7;
    cursor: default;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;

  color: #dc3545;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  width: 90%;
`;

const Expiry = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin: 2rem;
  padding: 2rem;
  width: 400px;
`;

const Image = styled.img`
  width: 50px;
  margin-bottom: 1rem;
`;

const StyledImage = styled(Image)`
  width: 180px;
`;

const Input = styled.input`
  border: 1px solid ${(props) => (props.error ? '#dc3545' : '#ced4da')};
  border-radius: 0.25rem;
  height: 1.5rem;
  margin-bottom: ${(props) => (props.error ? '0.5rem' : '1.2rem')};
  padding: 0.375rem 0.75rem;

  &:focus {
    border-color: ${(props) => (props.error ? '#dc3545' : '#ced4da')};
    outline: 0;
    box-shadow: 0 0 0 0.2rem
      ${(props) =>
        props.error ? 'rgba(220, 53, 69, 0.25)' : 'rgba(0, 123, 255, 0.25)'};
  }
`;

const InputGroup = styled.div`
  width: 50%;
`;

const StyledInputGroup = styled(InputGroup)`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const NumberInput = styled(Input)`
  width: 80%;
`;

const Result = styled.div`
  display: flex;
  align-items: center;

  margin: 5rem;
`;

const CARDS = {
  amex: {
    grouping: [4, 6, 5],
    maxLength: 17,
    cvv: 4,
  },
  visa: {
    grouping: [4, 4, 4, 4],
    maxLength: 19,
    cvv: 3,
  },
  card: {
    grouping: [4, 4, 4, 4],
    maxLength: 19,
    cvv: 3,
  },
};

const CCForm = () => {
  const [showForm, setShowForm] = useState(true);

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

  const [cardType, setCardType] = useState('card');

  const onChange = useCallback(
    (type) => (e) => {
      let value = e.target.value.trim();

      setData({
        ...data,
        [type]: value,
      });

      if (e.target.validationMessage) {
        setErrors({
          ...errors,
          [type]: e.target.validationMessage,
        });
      } else {
        delete errors[type];
      }
    },
    [data, errors]
  );

  const onCardChange = useCallback(
    (type) => (e) => {
      let value = e.target.value;
      let match = value.replace(/\s+/g, '');

      if (match.slice(0, 1) === '4') {
        setCardType('visa');
      } else if (match.slice(0, 2) === '34' || match.slice(0, 2) === '37') {
        setCardType('amex');
      } else {
        setCardType('card');
      }

      let errorMessage;
      if (value.length === 0) {
        errorMessage = 'Please fill out this field.';
      } else if (match.length < 16) {
        errorMessage = 'Invalid card number.';
      }

      let groups = [];
      let group = CARDS[cardType].grouping;
      for (let i = 0, j = 0; i < match.length; i += group[j], j++) {
        groups.push(match.substring(i, i + group[j]));
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
    },
    [cardType, data, errors]
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setShowForm(false);
    console.log('data: ', data);
  };

  const CardImage = () => {
    if (cardType === 'amex') {
      return <Image src={amex} alt="amex card image" />;
    } else if (cardType === 'visa') {
      return <Image src={visa} alt="visa card image" />;
    } else {
      return <StyledImage src={card} alt="credit cards image" />;
    }
  };

  return (
    <Container>
      {showForm ? (
        <Form onSubmit={handleOnSubmit}>
          <H3>Enter your credit card information</H3>

          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={onChange('name')}
            pattern="^[\sa-zA-Z]*$"
            maxLength="40"
            required
            error={errors.name}
          />
          {errors.name && (
            <ErrorMessage>
              <ErrorIcon />
              {errors.name}
            </ErrorMessage>
          )}

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
            maxLength={CARDS[cardType].maxLength}
            required
            error={errors.card}
          />
          {errors.card && (
            <ErrorMessage>
              <ErrorIcon />
              {errors.card}
            </ErrorMessage>
          )}

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
            minLength={CARDS[cardType].cvv}
            maxLength={CARDS[cardType].cvv}
            required
            error={errors.cvv}
          />
          {errors.cvv && (
            <ErrorMessage>
              <ErrorIcon />
              {errors.cvv}
            </ErrorMessage>
          )}

          <Expiry>
            <InputGroup>
              <NumberInput
                type="number"
                name="exp-month"
                id="exp-month"
                placeholder="Exp. Month (MM)"
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
                error={errors.expMonth}
              />
              {errors.expMonth && (
                <StyledErrorMessage>
                  <ErrorIcon />
                  {errors.expMonth}
                </StyledErrorMessage>
              )}
            </InputGroup>

            <StyledInputGroup>
              <NumberInput
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
                error={errors.expYear}
              />
              {errors.expYear && (
                <StyledErrorMessage>
                  <ErrorIcon />
                  {errors.expYear}
                </StyledErrorMessage>
              )}
            </StyledInputGroup>
          </Expiry>

          <CardImage />

          <Button type="submit" disabled={Object.keys(errors).length}>
            Submit
          </Button>
        </Form>
      ) : (
        <Result>
          <div
            className="material-icons"
            style={{
              color: '#6cbf6c',
              fontSize: '1.5rem',
              marginRight: '0.2rem',
            }}
          >
            check_circle
          </div>
          <H3>Your card has been succesfully added.</H3>
        </Result>
      )}
    </Container>
  );
};

export default CCForm;
