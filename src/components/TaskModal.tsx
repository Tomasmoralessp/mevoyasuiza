import React, { useState } from 'react';
import { X, Upload, ExternalLink, Lightbulb, FileText, Edit3, Clock, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskModal({ task, isOpen, onClose, onUpdateTask }: TaskModalProps) {
  const [notes, setNotes] = useState(task.notes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUpdating(true);
      console.log('📎 Subiendo archivo:', file.name);
      
      try {
        await onUpdateTask(task.id, { uploadedFile: file.name });
        console.log('✅ Archivo subido correctamente');
      } catch (error) {
        console.error('❌ Error subiendo archivo:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleNotesChange = async (newNotes: string) => {
    setNotes(newNotes);
    
    // Debounce para no hacer demasiadas llamadas
    clearTimeout((window as any).notesTimeout);
    (window as any).notesTimeout = setTimeout(async () => {
      console.log('📝 Guardando notas:', newNotes);
      try {
        await onUpdateTask(task.id, { notes: newNotes });
        console.log('✅ Notas guardadas');
      } catch (error) {
        console.error('❌ Error guardando notas:', error);
      }
    }, 1000);
  };

  const handleComplete = async () => {
    setIsUpdating(true);
    console.log('✅ Marcando tarea como completada:', task.id);
    
    try {
      await onUpdateTask(task.id, { status: 'completed' });
      console.log('✅ Tarea completada correctamente');
      onClose();
    } catch (error) {
      console.error('❌ Error completando tarea:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkActive = async () => {
    setIsUpdating(true);
    console.log('🔄 Activando tarea:', task.id);
    
    try {
      await onUpdateTask(task.id, { status: 'active' });
      console.log('✅ Tarea activada correctamente');
    } catch (error) {
      console.error('❌ Error activando tarea:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[85vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Header - Fixed */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-3 mb-3">
              <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
              
              {/* Optional Badge */}
              {task.isOptional && (
                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
                  <HelpCircle className="w-3 h-3" />
                  <span>Opcional</span>
                </div>
              )}
              
              {/* Priority Badge - Solo si NO está completada Y NO es opcional */}
              {task.priority === 'critical' && task.status !== 'completed' && !task.isOptional && (
                <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Crítico</span>
                </div>
              )}
              {task.priority === 'high' && task.status !== 'completed' && !task.isOptional && (
                <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                  Importante
                </div>
              )}
            </div>
            
            {task.estimatedTime && (
              <div className="flex items-center space-x-2 text-blue-600 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Tiempo estimado: {task.estimatedTime}</span>
              </div>
            )}

            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
              task.status === 'completed' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : task.status === 'active'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-gray-50 text-gray-700 border-gray-200'
            }`}>
              {task.status === 'completed' && <CheckCircle className="w-4 h-4 mr-1" />}
              {task.status === 'completed' ? 'Completada' : task.status === 'active' ? 'En progreso' : 'Pendiente'}
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
          </div>

          {/* Optional Reason */}
          {task.isOptional && task.optionalReason && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">ℹ️ Tarea opcional</h4>
                  <p className="text-amber-800 text-sm">{task.optionalReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Consequences */}
          {task.consequences && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-2">⚠️ Importante</h4>
                  <p className="text-red-800 text-sm">{task.consequences}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tip - Solo mostrar si NO está completada */}
          {task.tip && task.status !== 'completed' && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">💡 Consejo de experto</h4>
                  <p className="text-amber-800 text-sm">{task.tip}</p>
                </div>
              </div>
            </div>
          )}

          {/* Links */}
          {task.links && task.links.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Enlaces útiles
              </h4>
              <div className="space-y-2">
                {task.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-blue-900 font-medium text-sm">{link.title}</span>
                      <ExternalLink className="w-4 h-4 text-blue-600 group-hover:text-blue-800" />
                    </div>
                    {link.description && (
                      <p className="text-blue-700 text-xs mt-1">{link.description}</p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* File Upload */}
          {task.fileRequired && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Documento requerido
              </h4>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium mb-2 text-sm">{task.fileRequired}</p>
                  {task.uploadedFile ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                      <p className="text-emerald-700 font-medium flex items-center justify-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Archivo subido: {task.uploadedFile}</span>
                      </p>
                    </div>
                  ) : (
                    <label className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors font-medium text-sm">
                      {isUpdating ? 'Subiendo...' : 'Seleccionar archivo'}
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        disabled={isUpdating}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Edit3 className="w-4 h-4 mr-2" />
              Notas personales
            </h4>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Añade tus notas, recordatorios o comentarios sobre esta tarea..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 text-sm"
              rows={4}
            />
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm"
          >
            Cerrar
          </button>
          
          <div className="flex space-x-3">
            {task.status === 'blocked' && (
              <button
                onClick={handleMarkActive}
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
              >
                {isUpdating ? 'Activando...' : 'Activar tarea'}
              </button>
            )}
            
            {task.status !== 'completed' && task.status !== 'blocked' && (
              <button
                onClick={handleComplete}
                disabled={isUpdating}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center space-x-2 text-sm disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isUpdating ? 'Completando...' : 'Marcar como completada'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}