// src/components/DocumentManager.tsx
import React from 'react';
import { X, FileText, Download, Upload, Check, AlertCircle, FolderDown } from 'lucide-react';
import { Progress, Phase } from '../types';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { supabase } from '../lib/supabase';

interface DocumentManagerProps {
  progress: Progress;
  phases: Phase[];
  onClose: () => void;
}

export function DocumentManager({ progress, phases, onClose }: DocumentManagerProps) {
  const tasksWithFiles = phases.flatMap(phase => 
    phase.tasks.filter(task => task.fileRequired).map(task => ({
      ...task,
      phaseTitle: phase.title,
      phaseIcon: phase.icon,
      uploaded: progress[task.id]?.uploadedFile
    }))
  );

  const uploadedFiles = tasksWithFiles.filter(task => task.uploaded);
  const pendingFiles = tasksWithFiles.filter(task => !task.uploaded);

  const handleDownload = async (fileName: string) => {
    const { data } = await supabase.storage.from('documents').createSignedUrl(fileName, 60);
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    for (const task of uploadedFiles) {
      const { data } = await supabase.storage.from('documents').createSignedUrl(task.uploaded, 60);
      const blob = await fetch(data.signedUrl).then(res => res.blob());
      zip.file(task.uploaded, blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'documentos_mevoyasuiza.zip');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Gestor de Documentos</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content with Scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{uploadedFiles.length}</div>
              <div className="text-sm text-green-700">Documentos Subidos</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{pendingFiles.length}</div>
              <div className="text-sm text-orange-700">Pendientes</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{tasksWithFiles.length}</div>
              <div className="text-sm text-blue-700">Total Requeridos</div>
            </div>
            <button onClick={handleDownloadAll} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 flex items-center justify-center space-x-2">
              <FolderDown className="w-5 h-5" />
              <span className="text-sm font-medium">Descargar Todo</span>
            </button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-2" />
                Documentos Subidos
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {uploadedFiles.map(task => (
                  <div key={task.id} className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{task.phaseIcon}</span>
                        <div>
                          <div className="font-semibold text-green-900">{task.title}</div>
                          <div className="text-sm text-green-700">{task.phaseTitle}</div>
                          <div className="text-xs text-green-600 mt-1">Archivo: {task.uploaded}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleDownload(task.uploaded)} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pendingFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                Documentos Pendientes
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {pendingFiles.map(task => (
                  <div key={task.id} className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{task.phaseIcon}</span>
                        <div>
                          <div className="font-semibold text-orange-900">{task.title}</div>
                          <div className="text-sm text-orange-700">{task.phaseTitle}</div>
                          <div className="text-xs text-orange-600 mt-1">Requerido para continuar</div>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">Subir</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tasksWithFiles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay documentos requeridos aún</h3>
              <p className="text-gray-600">Los documentos aparecerán aquí conforme avances en el proceso</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
          <div className="text-sm text-gray-600">Todos los documentos se guardan de forma segura</div>
          <button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
