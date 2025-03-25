import React, { useState } from 'react';
import { supabase } from '../../supabase';

const JugadorSearch = () => {
  const [rut, setRut] = useState('');
  const [jugador, setJugador] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setJugador(null);
    setSearched(true);
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('jugadores')
        .select('nombres, materno, paterno, rut, club, nacimiento, asociacion')  
        .eq('rut', rut);
      
      if (supabaseError) {
        setError("Error en la consulta: " + supabaseError.message);
      } else if (data.length === 0) {
        setError("No se encontró el RUT ingresado.");
      } else {
        setJugador(data[0]);
      }
    } catch (e) {
      setError("Error al procesar la solicitud: " + e.message);
    }
  };
  
  const validateRut = (e) => {
    const valor = e.target.value.replace(/\./g, '').replace(/-/g, '');
    if (!/^[0-9]{7,8}[0-9kK]$/.test(valor)) {
      alert('Formato de RUT inválido.');
      e.target.focus();
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-600">Buscar jugador</h2>
      
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label htmlFor="rut" className="block text-sm font-medium mb-1">
            RUT del Jugador:
          </label>
          <input 
            type="text" 
            id="rut" 
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            onBlur={validateRut}
            placeholder="Ingrese RUT sin puntos ni guión" 
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Buscar
        </button>
      </form>

      {error && 
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p>{error}</p>
        </div>
      }
      
      {jugador && 
        <div className="bg-green-50 border border-green-200 px-4 py-3 rounded-md mb-6">
          <p className="text-green-800">
            Jugador encontrado: {jugador.nombres} {jugador.materno} {jugador.paterno}
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white mt-2 py-2 px-4 rounded-md"
          >
            Ver detalles
          </button>
          
          {showModal && (
            <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-xl">
                <div className="flex justify-between items-center border-b p-4">
                  <h3 className="text-xl font-semibold">Información del Jugador</h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6 w-96">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-1/3">
                          Nombres
                        </th>
                        <td className="px-4 py-3 text-sm">{jugador.nombres}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-1/3">
                          Nombres
                        </th>
                        <td className="px-4 py-3 text-sm">{jugador.paterno} {jugador.materno}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-1/3">
                          RUT
                        </th>
                        <td className="px-4 py-3 text-sm">{jugador.rut}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-1/3">
                          Equipo
                        </th>
                        <td className="px-4 py-3 text-sm">{jugador.club}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-1/3">
                          Nacimiento
                        </th>
                        <td className="px-4 py-3 text-sm">{jugador.nacimiento}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-1/3">
                          Asociación
                        </th>
                        <td className="px-4 py-3 text-sm">{jugador.asociacion}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="border-t p-4 flex justify-end">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default JugadorSearch;