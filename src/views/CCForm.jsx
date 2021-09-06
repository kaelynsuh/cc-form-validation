import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.div`
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
  const [data, setData] = useState({}); // input, value
  const [errors, setErrors] = useState({});

  const [cardData, setCardData] = useState('');
  // console.log('cardData: ', cardData);

  // console.log('data: ', data);
  // console.log('errors: ', errors);

  const onChange = (type) => (e) => {
    // console.log('e: ', e);
    // console.log('e.target: ', e.target);
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

  const onCardChange = (type) => (e) => {
    console.log('e.target.value: ', e.target.value);
    let value = e.target.value;

    // let last = value.charAt(value.length - 1);
    // console.log('last: ', last);
    // let isNotANumber = !last.match(/\d+/g);
    // console.log('isNotANumber: ', isNotANumber);

    // match any whitespace char and replace with ''
    // match any character not in 0-9 and replace with ''
    let match = value.replace(/\s+/g, '').replace(/[^0-9]/g, ''); // no onKeyPress needed
    console.log('match: ', match);

    var groups = [];
    for (let i = 0; i < match.length; i += 4) {
      groups.push(match.substring(i, i + 4));
    }

    if (groups.length) {
      setCardData(groups.join(' '));
    } else {
      // setCardData(value);
      setCardData(match);
    }

    // setCardData(e.target.value);

    // setData({
    //   ...data,
    //   [type]: e.target.value,
    // });

    // setErrors({
    //   ...errors,
    //   [type]: e.target.validationMessage,
    // });
  };

  return (
    <Container>
      <Form>
        <h3>Enter your credit card information</h3>

        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          onChange={onChange('name')}
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
          value={cardData}
          onChange={onCardChange('card')}
          // onKeyPress={(event) => {
          //   if (!/[0-9]/.test(event.key)) {
          //     event.preventDefault();
          //   }
          // }}
          maxLength="19"
          required
        />
        {errors.card && <ErrorMessage>{errors.card}</ErrorMessage>}

        <Input
          type="text"
          name="cvv"
          id="cvv"
          placeholder="CVV2"
          maxLength="4"
          required
        />

        <Expiry>
          <Input
            type="text"
            name="exp-month"
            id="exp-month"
            placeholder="Exp. Month"
            min="1"
            max="12"
            maxLength="2"
            required
          />

          <Input
            type="text"
            name="exp-year"
            id="exp-year"
            placeholder="Exp. Year"
            maxLength="2"
            required
          />
        </Expiry>

        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
};

export default CCForm;
