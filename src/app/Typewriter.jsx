'use client';
import { TypeAnimation } from 'react-type-animation';

const Typewriter = ({ text }) => {
  return (
    <TypeAnimation
      sequence={[text]}
      wrapper="span"
      speed={70} // Adjust speed here
      cursor={false}
      repeat={0}
    />
  );
};

export default Typewriter;