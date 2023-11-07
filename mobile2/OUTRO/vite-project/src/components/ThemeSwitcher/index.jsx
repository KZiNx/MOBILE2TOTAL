import React, { useEffect } from 'react';
import './ThemeSwitcher.css';

function ThemeSwitcher() {
  useEffect(() => {
    const modoSalvo = localStorage.getItem('modo');
    if (modoSalvo) {
      document.documentElement.className = modoSalvo;
    }
  }, []);

  const toggleModo = () => {
    if (document.documentElement.className === 'modoclaro') {
      document.documentElement.className = 'modoescuro';
      localStorage.setItem('modo', 'modoescuro');
    } else {
      document.documentElement.className = 'modoclaro';
      localStorage.setItem('modo', 'modoclaro');
    }
  };

  return (
    <div className="Modo">
      <button id="toggle" className="botao" onClick={toggleModo}>
        Modo Escuro/Claro
      </button>
    </div>
  );
}

export default ThemeSwitcher;
