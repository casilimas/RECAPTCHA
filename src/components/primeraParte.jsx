import { useState, useEffect } from 'react';

const generateRandomText = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const SimulatedReCAPTCHA = () => {
  const [randomText, setRandomText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setRandomText(generateRandomText(6)); // Genera un texto aleatorio de 6 caracteres
  }, []);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === randomText) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
      alert('La verificación falló. Por favor, inténtalo de nuevo.');
      setRandomText(generateRandomText(6)); // Genera un nuevo texto aleatorio
      setUserInput('');
    }
  };

  const handleRefresh = () => {
    setRandomText(generateRandomText(6)); // Genera un nuevo texto aleatorio
    setUserInput('');
    setIsVerified(false);
  };

  return (
    <div className='container'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='etiqueta'>
            <label htmlFor="captcha" className="no-select">{randomText}</label>
          </div>
          <div>
            <input
              type="text"
              id="captcha"
              value={userInput}
              onChange={handleChange}
              placeholder="Introduce el texto de arriba"
              required
            />
          </div>
          <button type="submit" className="button">Verificar</button>
        </form>
        <button onClick={handleRefresh} className="button">Actualizar código</button>
        {isVerified && <p className='verification-message'>¡Verificación satisfactoria!</p>}
      </div>
    </div>
  );
};

export default SimulatedReCAPTCHA;
