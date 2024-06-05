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
  const [showMessage, setShowMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Nuevo estado para el contador

  useEffect(() => {
    setRandomText(generateRandomText(6)); // Genera un texto aleatorio de 6 caracteres
  }, []);

  useEffect(() => {
    let timer;
    if (showMessage) {
      setTimeLeft(10);
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setShowMessage(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showMessage]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === randomText) {
      setIsVerified(true);
      setShowMessage(true);
      setUserInput(''); // Limpiar la entrada de texto
      setRandomText(generateRandomText(6)); // Genera un nuevo texto aleatorio
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
    setShowMessage(false);
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
        {isVerified && showMessage && (
          <div>
            <p className='verification-message'>
              ¡Verificación satisfactoria! wilmercasilimas@gmail.com
            </p>
            <p>desaparecerá en {timeLeft} segundos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulatedReCAPTCHA;
