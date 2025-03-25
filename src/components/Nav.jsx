import React, { useState, useEffect } from 'react';

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para manejar el estilo del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para cerrar el menú al seleccionar una opción
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Barra de navegación con altura fija de 10vh usando style directo */}
      <nav 
        className={`fixed w-full ${scrolled ? 'bg-black/70' : 'bg-black/50'} backdrop-blur p-4 flex justify-between items-center shadow-md transition-all duration-300 z-20`}
        style={{ height: '10vh' }}
      >
        <div className="text-white text-2xl font-bold">
          <a href="/">FENFUR</a>
        </div>
        
        {/* Navegación para escritorio */}
        <ul className="hidden md:flex space-x-6 text-white text-xl">
          <li><a href="/" className="hover:text-gray-300 transition-colors">Inicio</a></li>
          <li><a href="/Clubes" className="hover:text-gray-300 transition-colors">Clubes</a></li>
          <li><a href="/Registro" className="hover:text-gray-300 transition-colors">Registro Jugadores</a></li>
          <li><a href="/Contacto" className="hover:text-gray-300 transition-colors">Contacto</a></li>
        </ul>
        
        <button className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Iniciar sesión
        </button>
        
        {/* Botón para móvil */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>
      </nav>
      
      {/* Menú móvil posicionado a 10vh utilizando style directo */}
      <div 
        className={`md:hidden bg-black/80 backdrop-blur-sm fixed w-full text-center transition-all duration-300 z-10 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{ top: '10vh' }}
      >
        <ul className="space-y-4 py-4 text-gray-600 mx-4 rounded-xl bg-white">
          <li><a href="/" onClick={closeMenu} className="block p-2 hover:bg-black/50 transition-colors">Inicio</a></li>
          <li><a href="/Clubes" onClick={closeMenu} className="block p-2 hover:bg-black/50 transition-colors">Clubes</a></li>
          <li><a href="/Registro" onClick={closeMenu} className="block p-2 hover:bg-black/50 transition-colors">Registro Jugadores</a></li>
          <li><a href="/Contacto" onClick={closeMenu} className="block p-2 hover:bg-black/50 transition-colors">Contacto</a></li>
          <li className="p-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition-colors">
              Iniciar sesión
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ResponsiveNavbar;