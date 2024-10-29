import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { wantToVisitState } from './countryState';

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #333, #444);
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 6px;
  flex: 1;
  font-size: 16px;
  color: #fff;
  background-color: #555;
  transition: background-color 0.3s, transform 0.2s;

  &:focus {
    background-color: #666;
    outline: none;
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #ff7f50, #ff6347);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: linear-gradient(135deg, #ff6347, #ff4500);
    transform: scale(1.05);
  }
`;

function CountryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ country: string }>();
  const setWantToVisit = useSetRecoilState(wantToVisitState);

  const onSubmit = (data: { country: string }) => {
    setWantToVisit((prev) => {
      const updatedList = [...prev, data.country];
      localStorage.setItem('wantToVisit', JSON.stringify(updatedList));
      return updatedList;
    });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('country', { required: true })} placeholder="이름" />
      {errors.country && <span style={{ color: 'red' }}>This field is required</span>}
      <Button type="submit">가자!</Button>
    </Form>
  );
}

export default CountryForm;