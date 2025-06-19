import React from 'react';
import { X, Download, Share2, FileText, CheckCircle, Clock, Lock } from 'lucide-react';
import { Progress, Phase } from '../types';

interface ExportProgressProps {
  phases: Phase[];
  progress: Progress;
  onClose: () => void;
}

export function ExportProgress({ phases, progress, onClose }: ExportProgressProps) {
  const generatePDF = () => {
    // Simulate PDF generation
    const element = document.createElement('a');
    const content = generateProgressReport();
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'mi-progreso-suiza.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateProgressReport = () => {
    let report = '🇨🇭 MI PROGRESO HACIA SUIZA\n';
    report += '================================\n\n';
    
    const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
    const completedTasks = Object.values(progress).filter(p => p.status === 'completed').length;
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
    
    report += `📊 RESUMEN GENERAL\n`;
    report += `Progreso total: ${progressPercentage}%\n`;
    report += `Tareas completadas: ${completedTasks} de ${totalTasks}\n`;
    report += `Fecha del reporte: ${new Date().toLocaleDateString('es-ES')}\n\n`;
    
    phases.forEach((phase, phaseIndex) => {
      const phaseCompleted = phase.tasks.filter(task => progress[task.id]?.status === 'completed').length;
      const phaseTotal = phase.tasks.length;
      const phaseProgress = Math.round((phaseCompleted / phaseTotal) * 100);
      
      report += `${phase.icon} FASE ${phaseIndex + 1}: ${phase.title.toUpperCase()}\n`;
      report += `Progreso: ${phaseProgress}% (${phaseCompleted}/${phaseTotal})\n`;
      report += `Duración estimada: ${phase.estimatedDuration || 'No especificada'}\n\n`;
      
      phase.tasks.forEach((task, taskIndex) => {
        const taskProgress = progress[task.id];
        const status = taskProgress?.status || task.status;
        const statusIcon = status === 'completed' ? '✅' : status === 'active' ? '🔄' : '🔒';
        
        report += `  ${taskIndex + 1}. ${statusIcon} ${task.title}\n`;
        if (task.estimatedTime) {
          report += `     ⏱️ Tiempo estimado: ${task.estimatedTime}\n`;
        }
        if (taskProgress?.uploadedFile) {
          report += `     📎 Documento subido: ${taskProgress.uploadedFile}\n`;
        }
        if (taskProgress?.notes) {
          report += `     📝 Notas: ${taskProgress.notes}\n`;
        }
        report += '\n';
      });
      
      report += '\n';
    });
    
    report += '💡 CONSEJOS IMPORTANTES:\n';
    report += '- Mantén todos tus documentos organizados\n';
    report += '- Revisa regularmente los requisitos actualizados\n';
    report += '- No dudes en contactar con las autoridades suizas para dudas\n';
    report += '- Únete a comunidades de españoles en Suiza para apoyo\n\n';
    
    report += 'Generado por MeVoyASuiza.app 🚀\n';
    
    return report;
  };

  const shareProgress = () => {
    const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
    const completedTasks = Object.values(progress).filter(p => p.status === 'completed').length;
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
    
    const shareText = `🇨🇭 ¡Mi progreso hacia Suiza va genial! Ya llevo un ${progressPercentage}% completado (${completedTasks}/${totalTasks} tareas). ¿Tú también estás pensando en emigrar? Te recomiendo MeVoyASuiza.app 🚀 #Suiza #Emigrar #MeVoyASuiza`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mi progreso hacia Suiza',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('¡Texto copiado al portapapeles! Pégalo en tus redes sociales.');
    }
  };

  const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const completedTasks = Object.values(progress).filter(p => p.status === 'completed').length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center space-x-3">
            <Download className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Exportar Progreso</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Progress Summary */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">
                {progressPercentage}%
              </div>
              <div className="text-lg font-semibold text-red-800 mb-1">
                Progreso Completado
              </div>
              <div className="text-red-700">
                {completedTasks} de {totalTasks} tareas terminadas
              </div>
              <div className="w-full h-3 bg-red-200 rounded-full mt-4">
                <div 
                  className="h-full bg-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Opciones de Exportación</h3>
            
            {/* PDF Export */}
            <button
              onClick={generatePDF}
              className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-blue-900">Descargar Reporte PDF</div>
                  <div className="text-sm text-blue-700">Reporte completo con tu progreso detallado</div>
                </div>
              </div>
              <Download className="w-5 h-5 text-blue-600 group-hover:text-blue-800" />
            </button>

            {/* Social Share */}
            <button
              onClick={shareProgress}
              className="w-full flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <Share2 className="w-6 h-6 text-orange-600" />
                <div className="text-left">
                  <div className="font-semibold text-orange-900">Compartir en Redes Sociales</div>
                  <div className="text-sm text-orange-700">Comparte tu progreso con amigos y familia</div>
                </div>
              </div>
              <Share2 className="w-5 h-5 text-orange-600 group-hover:text-orange-800" />
            </button>
          </div>

          {/* Phase Summary */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen por Fases</h3>
            <div className="space-y-3">
              {phases.map((phase, index) => {
                const phaseCompleted = phase.tasks.filter(task => progress[task.id]?.status === 'completed').length;
                const phaseTotal = phase.tasks.length;
                const phaseProgress = Math.round((phaseCompleted / phaseTotal) * 100);
                const isCompleted = phaseCompleted === phaseTotal;
                
                return (
                  <div key={phase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{phase.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{phase.title}</div>
                        <div className="text-sm text-gray-600">
                          {phaseCompleted}/{phaseTotal} tareas
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-semibold text-gray-700">
                        {phaseProgress}%
                      </div>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : phaseCompleted > 0 ? (
                        <Clock className="w-5 h-5 text-orange-600" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
          <div className="text-sm text-gray-600">
            Tu progreso se actualiza automáticamente
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}