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
  }); // input, value
  const [errors, setErrors] = useState({});

  const [cardData, setCardData] = useState('');
  // console.log('cardData: ', cardData);

  console.log('data: ', data);
  console.log('errors: ', errors);

  // const nameRef = useRef();

  const onChange = (type) => (e) => {
    console.log('e.target.validity: ', e.target.validity);
    // console.log('e.target.validationMessage: ', e.target.validationMessage);

    setData({
      ...data,
      [type]: e.target.value,
    });

    setErrors({
      ...errors,
      [type]: e.target.validationMessage,
    });
  };

  const onNameChange = useCallback(
    (type, value) => {
      // debugger;
      let errorMessage;
      if (value.length === 0) {
        errorMessage = 'name: field cannot be empty';
      } else if (!value.match(/^[a-zA-Z]+$/g)) {
        errorMessage = 'name: name not valid';
      }

      // revisit: if error, unset name?
      setData({
        ...data,
        [type]: value,
      });

      setErrors({
        ...errors,
        [type]: errorMessage,
      });
    },
    [data, errors]
  );

  const onCardChange = useCallback(
    (type, value) => {
      let errorMessage;
      if (value.length === 0) {
        errorMessage = 'card: field cannot be empty';
      } else if (value.length < 18) {
        errorMessage = 'card: invalid character';
      }

      let match = value.replace(/\s+/g, '').replace(/[^0-9]/g, ''); // no onKeyPress needed
      console.log('match: ', match);

      var groups = [];
      for (let i = 0; i < match.length; i += 4) {
        groups.push(match.substring(i, i + 4));
      }

      if (groups.length) {
        // setCardData(groups.join(' '));
        setData({
          ...data,
          [type]: groups.join(' '),
        });
      } else {
        // setCardData(match);
        setData({
          ...data,
          [type]: match,
        });
      }

      setErrors({
        ...errors,
        [type]: errorMessage,
      });
    },
    [data, errors]
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();

    console.log('data: ', data);
    console.log('errors: ', errors);

    onNameChange('name', data.name);
    onCardChange('card', data.card);

    // check if errors is empty
    if (Object.keys(errors).length === 0) {
      console.log('no errors!!!!');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleOnSubmit}>
        <h3>Enter your credit card information</h3>

        <Input
          type="text"
          name="name"
          id="name"
          // ref={nameRef}
          placeholder="Name"
          // onChange={onChange('name')}
          onChange={(e) => onNameChange('name', e.target.value)}
          // pattern="^[a-zA-Z]*$"
          maxLength="40"
          required
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <Input
          type="tel"
          name="card-number"
          id="card-number"
          placeholder="Card Number"
          // value={cardData}
          value={data.card}
          // onChange={onCardChange('card')}
          onChange={(e) => onCardChange('card', e.target.value)}
          // onKeyPress={(event) => {
          //   if (!/[0-9]/.test(event.key)) {
          //     event.preventDefault();
          //   }
          // }}
          maxLength="19"
          // required
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
          maxLength="4"
          // required
        />
        {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}

        <Expiry>
          <Input
            type="text"
            name="exp-month"
            id="exp-month"
            placeholder="Exp. Month"
            onChange={onChange('expMonth')}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            min="1"
            max="12"
            maxLength="2"
            // required
          />

          <Input
            type="text"
            name="exp-year"
            id="exp-year"
            onChange={onChange('expYear')}
            placeholder="Exp. Year"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            maxLength="2"
            // required
          />
        </Expiry>

        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
};

export default CCForm;
