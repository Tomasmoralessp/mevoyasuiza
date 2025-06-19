import { Task } from '../types';

// ========================================
// 🚀 PLANTILLAS PARA CREAR NUEVAS TAREAS
// ========================================

/**
 * Plantilla básica para crear cualquier tarea
 */
export const createBasicTask = (overrides: Partial<Task>): Task => ({
  id: '',
  title: '',
  description: '',
  status: 'blocked',
  priority: 'medium',
  estimatedTime: '1 día',
  ...overrides
});

/**
 * Plantilla para tareas críticas (prioridad máxima)
 */
export const createCriticalTask = (overrides: Partial<Task>): Task => ({
  ...createBasicTask(overrides),
  priority: 'critical',
  ...overrides
});

/**
 * Plantilla para tareas importantes (alta prioridad)
 */
export const createImportantTask = (overrides: Partial<Task>): Task => ({
  ...createBasicTask(overrides),
  priority: 'high',
  ...overrides
});

/**
 * Plantilla para tareas opcionales
 */
export const createOptionalTask = (overrides: Partial<Task>): Task => ({
  ...createBasicTask(overrides),
  isOptional: true,
  priority: 'low',
  ...overrides
});

/**
 * Plantilla para tareas que requieren subir un archivo
 */
export const createTaskWithFile = (overrides: Partial<Task>): Task => ({
  ...createBasicTask(overrides),
  fileRequired: 'Documento requerido',
  ...overrides
});

/**
 * Plantilla para tareas con enlaces útiles
 */
export const createTaskWithLinks = (overrides: Partial<Task>): Task => ({
  ...createBasicTask(overrides),
  links: [
    {
      title: 'Enlace útil',
      url: 'https://example.com',
      description: 'Descripción del enlace'
    }
  ],
  ...overrides
});

/**
 * Plantilla completa con todos los campos
 */
export const createCompleteTask = (overrides: Partial<Task>): Task => ({
  ...createBasicTask(overrides),
  tip: 'Consejo útil para esta tarea',
  consequences: 'Qué pasa si no se hace',
  fileRequired: 'Documento necesario',
  links: [
    {
      title: 'Portal oficial',
      url: 'https://oficial.com',
      description: 'Sitio web oficial'
    }
  ],
  ...overrides
});

// ========================================
// 📋 EJEMPLOS DE USO PARA NUEVAS TAREAS
// ========================================

export const exampleNewTasks = {
  // ✅ Tarea crítica con archivo
  newCriticalTask: createCriticalTask({
    id: 'nueva-tarea-critica',
    title: 'Nueva tarea crítica',
    description: 'Descripción de la nueva tarea crítica que es muy importante completar',
    estimatedTime: '2-3 días',
    fileRequired: 'Documento importante',
    tip: 'Consejo útil para esta tarea crítica',
    consequences: 'Sin este documento no podrás continuar con el proceso'
  }),

  // 🟡 Tarea opcional
  newOptionalTask: createOptionalTask({
    id: 'nueva-tarea-opcional',
    title: 'Nueva tarea opcional',
    description: 'Descripción de la tarea opcional que solo es necesaria en ciertos casos',
    optionalReason: 'Solo necesario si cumples cierta condición específica',
    estimatedTime: '1 día'
  }),

  // 🔗 Tarea con enlaces
  newTaskWithLinks: createTaskWithLinks({
    id: 'nueva-tarea-enlaces',
    title: 'Nueva tarea con enlaces',
    description: 'Tarea que incluye enlaces útiles para completar el proceso',
    links: [
      {
        title: 'Portal oficial',
        url: 'https://oficial.com',
        description: 'Sitio web oficial del gobierno'
      },
      {
        title: 'Guía completa',
        url: 'https://guia.com',
        description: 'Guía paso a paso detallada'
      }
    ]
  }),

  // 📄 Tarea importante con archivo
  newImportantTaskWithFile: createImportantTask({
    id: 'nueva-tarea-importante-archivo',
    title: 'Nueva tarea importante con archivo',
    description: 'Tarea importante que requiere subir un documento específico',
    estimatedTime: '1-2 días',
    fileRequired: 'Certificado oficial',
    tip: 'Asegúrate de que el documento esté apostillado',
    consequences: 'Necesario para continuar con los trámites oficiales'
  }),

  // 🎯 Tarea completa con todo
  newCompleteTask: createCompleteTask({
    id: 'nueva-tarea-completa',
    title: 'Nueva tarea completa',
    description: 'Ejemplo de tarea con todos los campos posibles completados',
    priority: 'high',
    estimatedTime: '3-5 días',
    tip: 'Este es un consejo muy útil para completar esta tarea',
    consequences: 'Es muy importante completar esta tarea para evitar problemas',
    fileRequired: 'Documento oficial requerido',
    links: [
      {
        title: 'Sitio oficial',
        url: 'https://oficial.gov',
        description: 'Portal gubernamental oficial'
      },
      {
        title: 'Tutorial paso a paso',
        url: 'https://tutorial.com',
        description: 'Guía detallada con capturas de pantalla'
      }
    ]
  })
};

// ========================================
// 📖 GUÍA RÁPIDA PARA AÑADIR TAREAS
// ========================================

/*
🚀 CÓMO AÑADIR UNA NUEVA TAREA:

1. **Importa las plantillas en phases.ts:**
   ```typescript
   import { createCriticalTask, createOptionalTask } from './taskTemplates';
   ```

2. **Crea la tarea usando una plantilla:**
   ```typescript
   const nuevaTarea = createCriticalTask({
     id: 'mi-nueva-tarea',
     title: 'Mi nueva tarea',
     description: 'Descripción detallada',
     estimatedTime: '2-3 días',
     fileRequired: 'Documento necesario',
     tip: 'Consejo útil',
     consequences: 'Qué pasa si no se hace'
   });
   ```

3. **Para tareas OPCIONALES, añádelas al final del array de tareas:**
   ```typescript
   export const phases: Phase[] = [
     {
       id: 'mi-fase',
       title: 'Mi Fase',
       tasks: [
         // ... tareas principales (obligatorias)
         nuevaTareaObligatoria1,
         nuevaTareaObligatoria2,
         // ... al final, las opcionales
         nuevaTareaOpcional1,
         nuevaTareaOpcional2,
       ]
     }
   ];
   ```

✅ **TIPOS DE TAREAS DISPONIBLES:**
- `createBasicTask()` - Tarea básica
- `createCriticalTask()` - Tarea crítica (badge rojo)
- `createImportantTask()` - Tarea importante (badge naranja)
- `createOptionalTask()` - Tarea opcional (badge amarillo)
- `createTaskWithFile()` - Tarea que requiere archivo
- `createTaskWithLinks()` - Tarea con enlaces útiles
- `createCompleteTask()` - Tarea con todos los campos

🎯 **CAMPOS DISPONIBLES:**
- `id` - Identificador único (obligatorio)
- `title` - Título de la tarea (obligatorio)
- `description` - Descripción detallada (obligatorio)
- `status` - Estado inicial ('blocked', 'active', 'completed')
- `priority` - Prioridad ('low', 'medium', 'high', 'critical')
- `estimatedTime` - Tiempo estimado (ej: '2-3 días')
- `isOptional` - Si es opcional (true/false)
- `optionalReason` - Explicación de cuándo es necesaria
- `fileRequired` - Nombre del archivo requerido
- `tip` - Consejo de experto
- `consequences` - Qué pasa si no se hace
- `links` - Array de enlaces útiles

🔗 **CONEXIONES DE TAREAS OPCIONALES:**
Las tareas opcionales se conectan automáticamente según esta lógica:
- Por defecto: Se conectan a la primera tarea principal de la fase
- Personalizable: Modifica la función `getConnectionForOptional()` en FlowchartPhase.tsx

💡 **CONSEJOS:**
- Usa IDs descriptivos en kebab-case: 'certificado-nacimiento'
- Las tareas críticas e importantes muestran badges de color
- Las tareas opcionales muestran badge amarillo "Opcional"
- Los badges desaparecen cuando la tarea se marca como completada
- Añade consejos útiles basados en experiencia real
- Las tareas opcionales aparecen en posiciones fijas al lado del flujo principal
*/