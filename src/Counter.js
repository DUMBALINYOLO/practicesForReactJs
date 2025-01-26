import React, { useState } from 'react';

// const Counter = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     if (count < 10) {
//       setCount(count + 1);
//     }
//   };

//   const decrement = () => {
//     if (count > 0) {
//       setCount(count - 1);
//     }
//   };

//   return (
//     <div>
//       <h1>Counter: {count}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//       {count === 10 && <p>You've reached the maximum count!</p>}
//     </div>
//   );
// };

// export default Counter;


const Counter = ({ initialCount = 0, max = 10, min = 0 }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    if (count < max) setCount(count + 1);
  };

  const decrement = () => {
    if (count > min) setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      {count === max && <p>You've reached the maximum count!</p>}
      {count === min && <p>You've reached the minimum count!</p>}
    </div>
  );
};


export default Counter;


