import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Target, AlertTriangle, Edit3 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function DeadlineTracker() {
  const [deadline, setDeadline] = useLocalStorage<string>('mevoyasuiza-deadline', '');
  const [showModal, setShowModal] = useState(false);
  const [tempDate, setTempDate] = useState('');
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<'safe' | 'warning' | 'critical'>('safe');

  useEffect(() => {
    if (deadline) {
      const deadlineDate = new Date(deadline);
      const today = new Date();
      const diffTime = deadlineDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setDaysLeft(diffDays);
      
      if (diffDays <= 30) {
        setUrgencyLevel('critical');
      } else if (diffDays <= 90) {
        setUrgencyLevel('warning');
      } else {
        setUrgencyLevel('safe');
      }
    }
  }, [deadline]);

  const handleSetDeadline = () => {
    if (tempDate) {
      setDeadline(tempDate);
      setShowModal(false);
      setTempDate('');
    }
  };

  const getUrgencyStyles = () => {
    switch (urgencyLevel) {
      case 'critical':
        return 'bg-red-600 text-white animate-pulse';
      case 'warning':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-green-600 text-white';
    }
  };

  const getUrgencyIcon = () => {
    switch (urgencyLevel) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      case 'warning':
        return <Clock className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  if (!deadline) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Fecha Límite</span>
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🎯 ¿Cuándo quieres mudarte a Suiza?
              </h3>
              <p className="text-gray-600 mb-6">
                Establecer una fecha límite te ayudará a mantener el ritmo y la motivación.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha objetivo de mudanza
                </label>
                <input
                  type="date"
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-amber-900 mb-2">💡 Recomendación:</h4>
                <p className="text-sm text-amber-800">
                  El proceso completo suele tomar entre 3-6 meses. Te recomendamos añadir tiempo extra para imprevistos.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSetDeadline}
                  disabled={!tempDate}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Establecer Fecha
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors shadow-lg ${getUrgencyStyles()}`}
      >
        {getUrgencyIcon()}
        <div className="text-left">
          <div className="text-xs font-medium">
            {daysLeft !== null && daysLeft > 0 ? `${daysLeft} días` : 'Fecha pasada'}
          </div>
          <div className="text-xs opacity-90">
            {urgencyLevel === 'critical' ? '¡Urgente!' : urgencyLevel === 'warning' ? 'Atención' : 'En tiempo'}
          </div>
        </div>
        <Edit3 className="w-3 h-3 opacity-75" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              📅 Modificar Fecha Límite
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nueva fecha objetivo
              </label>
              <input
                type="date"
                value={tempDate || deadline}
                onChange={(e) => setTempDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {daysLeft !== null && (
              <div className={`p-4 rounded-xl mb-6 ${
                urgencyLevel === 'critical' 
                  ? 'bg-red-50 border border-red-200' 
                  : urgencyLevel === 'warning'
                  ? 'bg-orange-50 border border-orange-200'
                  : 'bg-green-50 border border-green-200'
              }`}>
                <div className={`font-semibold mb-1 ${
                  urgencyLevel === 'critical' 
                    ? 'text-red-900' 
                    : urgencyLevel === 'warning'
                    ? 'text-orange-900'
                    : 'text-green-900'
                }`}>
                  {daysLeft > 0 ? `Quedan ${daysLeft} días` : 'Fecha objetivo pasada'}
                </div>
                <div className={`text-sm ${
                  urgencyLevel === 'critical' 
                    ? 'text-red-700' 
                    : urgencyLevel === 'warning'
                    ? 'text-orange-700'
                    : 'text-green-700'
                }`}>
                  {urgencyLevel === 'critical' 
                    ? '¡Es hora de acelerar el proceso!' 
                    : urgencyLevel === 'warning'
                    ? 'Mantén un buen ritmo de progreso'
                    : 'Vas con buen tiempo, sigue así'
                  }
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setDeadline('');
                  setShowModal(false);
                }}
                className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSetDeadline}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}