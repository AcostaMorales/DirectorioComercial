import { useContext } from 'react';
import { DeviceContext } from '../context/deviceContext';

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice debe usarse dentro de DeviceProvider');
  }
  return context;
};