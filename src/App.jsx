import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
// import PropTypes from 'prop-types';
import './App.css';

// React.memo é a mesma coisa que useMemo
const Button = React.memo(({ incrementButton }) => {
  return <button onClick={() => incrementButton(10)}>increment </button>;
});

// Button.propTypes = {
//   incrementButton: PropTypes.func,
// };

const GlobalContext = React.createContext();

const globalState = {
  mode: 'dark',
  count: 0,
};

const H1 = () => {
  const theContext = useContext(GlobalContext);
  console.log(theContext.context.count);
  return <p onClick={() => theContext.setContext(() => {})}>{theContext.context.count}</p>;
};

function App() {
  const [reverse, setReverse] = useState(false);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const input = useRef(null);
  const contador = useRef(0);

  const handleR = reverse ? 'reverse' : '';

  const handleReverse = () => {
    setReverse(!reverse);
  };

  const incrementButton = useCallback((num) => {
    setCount((count) => count + num);
  }, []);

  const handleName = (e) => {
    setValue(e.target.textContent);
  };

  const handleDarkLigth = () => {
    setContext(context === 'dark' ? 'ligth' : 'dark');
  };

  useEffect(() => {
    contador.current++;

    input.current.focus();
  }, [value]);

  const [context, setContext] = useState(globalState);

  return (
    <GlobalContext.Provider value={{ context, setContext }}>
      <div className={`App ${context}`}>
        <button onClick={handleDarkLigth}>dark/ligth</button>
        <H1 />
        <div>
          <a
            href=''
            target='_blank'
          ></a>
          <a
            href=''
            target='_blank'
          >
            <img
              src={reactLogo}
              className={`logo react ${handleR}`}
              alt='React logo'
            />
          </a>
        </div>
        <div className='card'>
          <button onClick={handleReverse}>change</button>
          <h1>contador de letras: {contador.current}</h1>
          <h1 onClick={handleName}>Count: {count}</h1>
          <Button incrementButton={incrementButton} />
        </div>
        <p>{value}</p>
        <input
          ref={input}
          type='text'
          value={value}
          placeholder={'escreva'}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
