import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Modal from 'react-modal';

// Icono personalizado para el marcador del usuario
const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Componente para mostrar el mapa interactivo y cambiar la ubicación
function MapaUbicacion({ ubicacion, setUbicacion }) {
  const map = useMapEvents({
    click(e) {
      setUbicacion([e.latlng.lat, e.latlng.lng]); // Actualizar la ubicación al hacer clic
    }
  });

  useEffect(() => {
    if (ubicacion) {
      map.setView(ubicacion, 14); // Centrar el mapa en la nueva ubicación
    }
  }, [ubicacion, map]);

  return ubicacion ? <Marker position={ubicacion} icon={userIcon} /> : null;
}

function Ubicacion() {
  const [ubicacion, setUbicacion] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Obtener la ubicación actual del usuario
  const obtenerUbicacionActual = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUbicacion([latitude, longitude]); // Guardar la ubicación
        },
        () => {
          alert('No se pudo obtener la ubicación.');
        }
      );
    } else {
      alert('La geolocalización no es soportada por este navegador.');
    }
  };

  const abrirModal = () => {
    obtenerUbicacionActual(); // Obtener la ubicación antes de abrir el modal
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const confirmarDireccion = () => {
    alert('Ubicación confirmada: ' + ubicacion);
    cerrarModal(); // Cerrar el modal al confirmar
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        onClick={abrirModal}
        className="ml-4 p-2 bg-[#0092bc] text-white rounded hover:bg-[#A3D9D3] hover:text-[#0092BC] w-48 h-10"
      >
        Ingresar ubicación
      </button>

      {/* Modal para confirmar la dirección */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={cerrarModal} // Permitir cerrar el modal al hacer clic fuera
        contentLabel="Verificar la ubicación"
        className="modal-content" // Clases CSS personalizadas
        overlayClassName="modal-overlay"
      >
        <h2>Verifica la ubicación</h2>
        <div style={{ height: '400px', width: '100%' }}>
          {/* Mostrar el mapa solo si se tiene la ubicación */}
          {ubicacion ? (
            <MapContainer center={ubicacion} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <MapaUbicacion ubicacion={ubicacion} setUbicacion={setUbicacion} />
            </MapContainer>
          ) : (
            <p>Obteniendo tu ubicación...</p>
          )}
        </div>

        <div className="modal-footer">
          {/* Botón para confirmar la dirección */}
          <button
            onClick={confirmarDireccion}
            className="bg-[#0092BC] text-white px-4 py-2 rounded mt-4 hover:bg-[#A3D9D3] hover:text-[#0092BC] transition duration-300"
          >
            Confirmar dirección
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Ubicacion;
