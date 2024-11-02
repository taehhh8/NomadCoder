import React from 'react';
import CountryForm from './components/CountryForm';
import CountryLists from './components/CountryLists';

export default function App() {
  return (
    <main>
      <h2>내가 가고싶은 나라들</h2>
      <CountryForm />
      <CountryLists />
    </main>
  );
}