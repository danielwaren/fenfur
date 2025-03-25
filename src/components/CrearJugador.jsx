import { supabase } from '../../supabase';
import { useState } from 'react';

export default function FormularioSupabase() {
  const [nombre, setNombre] = useState('');
  const [equipo, setEquipo] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Inserta los datos en la tabla de Supabase
      const { data, error } = await supabase
        .from('jugadores') // Reemplaza con el nombre de tu tabla
        .insert([{ nombre, apellido, rut, equipo, nacimiento }]);
        
      if (error) {
        setMensaje('Error al enviar los datos: ' + error.message);
      } else {
        setMensaje('Datos enviados correctamente!');
        setNombre('');
        setApellido('');
        setEquipo('');
        setNacimiento('');
        setRut('');
      }
    } catch (error) {
      setMensaje('Error inesperado: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Inscribir jugadores</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
            <label htmlFor="equipo" className="block text-sm font-medium text-gray-700 mb-1">
                Equipo:
            </label>
            <select
                id="equipo"
                value={equipo}
                onChange={(e) => setEquipo(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Selecciona un equipo</option>
                <option value="Colo Colo Austral">Colo Colo Austral</option>
                <option value="Universidad de Chile">Universidad de Chile</option>
                <option value="Cisnes">Cisnes</option>
                <option value="Fenix">Fenix</option>
                <option value="Arrayan">Arrayan</option>
            </select>
            </div>

        <div className="form-group">
          <label htmlFor="rut" className="block text-sm font-medium text-gray-700 mb-1">Rut:</label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento:</label>
          <input
            type="date"
            id="nacimiento"
            value={nacimiento}
            onChange={(e) => setNacimiento(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      
      {mensaje && (
        <div className={`mt-4 p-3 rounded-md ${mensaje.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
}