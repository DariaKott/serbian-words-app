import React from 'react';
import './styles.scss';

export default function Counter({ counter }) {
  return (
    <div className="counter">
      <p>За тренировку изучено слов:&nbsp;</p>
      <p>{counter}</p>
    </div>
  );
}
