import React from 'react';
import { useParams } from 'react-router-dom';

function Tutor () {
  const {id} = useParams();
  return (
    <>
      <h1>hello tutor {id}</h1>
    </>
  );
}

export default Tutor;