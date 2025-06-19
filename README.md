# MeVoyASuiza.app - Guía de Emigración a Suiza

## 🚀 Nuevas Funcionalidades

### 🔐 **Sistema de Autenticación con Google**
- Autenticación OAuth con Google
- Perfiles de usuario completos
- Sincronización automática del progreso

### 📊 **Base de Datos Supabase**
- Almacenamiento seguro del progreso del usuario
- Sincronización en tiempo real entre dispositivos
- Backup automático de todos los datos

### 🎯 **Onboarding Personalizado**
- Captura de fecha límite de mudanza
- Selección de cantón de destino
- Personalización de la experiencia

## 🛠️ Configuración

### 1. **Configurar Supabase**

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Copia las credenciales del proyecto
3. Crea un archivo `.env` basado en `.env.example`:

```bash
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

### 2. **Configurar Autenticación con Google**

1. Ve a Authentication > Providers en tu dashboard de Supabase
2. Habilita Google OAuth
3. Configura las credenciales de Google:
   - Ve a [Google Cloud Console](https://console.cloud.google.com)
   - Crea un proyecto o selecciona uno existente
   - Habilita la Google+ API
   - Crea credenciales OAuth 2.0
   - Añade tu dominio a los orígenes autorizados
   - Copia Client ID y Client Secret a Supabase

### 3. **Ejecutar Migraciones**

Las migraciones se encuentran en `supabase/migrations/`. Si usas Supabase CLI:

```bash
supabase db push
```

O ejecuta manualmente el SQL en el editor de Supabase.

## 📋 **Estructura de la Base de Datos**

### **Tabla: user_profiles**
- Información del perfil del usuario
- Fecha límite de mudanza
- Cantón de destino
- Estado del onboarding

### **Tabla: user_progress**
- Progreso de tareas por usuario
- Notas personales
- Archivos subidos
- Timestamps de completado

## 🔄 **Flujo de Autenticación**

1. **Usuario no autenticado**: Progreso guardado en localStorage
2. **Login con Google**: Creación automática de perfil
3. **Onboarding**: Captura de información personalizada
4. **Sincronización**: Migración del progreso local a la base de datos
5. **Uso normal**: Sincronización automática en tiempo real

## 🎯 **Funcionalidades del Sistema**

### **Gestión de Progreso**
- Sincronización automática entre dispositivos
- Backup en la nube
- Recuperación de progreso en caso de pérdida de datos locales

### **Personalización**
- Cronograma adaptado a la fecha límite
- Consejos específicos por cantón
- Recordatorios personalizados

### **Seguridad**
- Row Level Security (RLS) habilitado
- Los usuarios solo pueden acceder a sus propios datos
- Autenticación OAuth segura

## 🚀 **Cómo Usar**

1. **Primera visita**: Completa el welcome modal
2. **Autenticación**: Inicia sesión con Google (opcional)
3. **Onboarding**: Configura tu fecha límite y cantón de destino
4. **Progreso**: Tu avance se guarda automáticamente
5. **Sincronización**: Accede desde cualquier dispositivo

## 🔧 **Desarrollo**

### **Hooks Principales**

- `useAuth()`: Gestión de autenticación y perfil
- `useUserProgress()`: Sincronización de progreso con la base de datos
- `useTaskProgress()`: Lógica de desbloqueo de tareas

### **Componentes Nuevos**

- `GoogleAuthButton`: Botón de autenticación con Google
- `OnboardingModal`: Modal de configuración inicial
- `UserProfileMenu`: Menú de perfil de usuario

### **Utilidades**

- `supabase.ts`: Cliente de Supabase y tipos
- Migraciones SQL para la estructura de la base de datos

## 📊 **Ventajas del Nuevo Sistema**

### **Para el Usuario**
- ✅ Progreso seguro y sincronizado
- ✅ Acceso desde múltiples dispositivos
- ✅ Experiencia personalizada
- ✅ No pérdida de datos

### **Para el Desarrollo**
- ✅ Escalabilidad mejorada
- ✅ Analytics de uso
- ✅ Gestión centralizada de usuarios
- ✅ Posibilidad de funcionalidades premium

## 🎨 **Arquitectura de Componentes**

### 📁 Estructura de Carpetas

```
src/
├── components/
│   ├── TaskCard/           # Componentes modulares de tarjetas
│   ├── GoogleAuthButton.tsx # Autenticación con Google
│   ├── OnboardingModal.tsx  # Modal de configuración inicial
│   ├── UserProfileMenu.tsx  # Menú de perfil
│   └── ...
├── hooks/
│   ├── useAuth.ts          # Hook de autenticación
│   ├── useUserProgress.ts  # Hook de progreso de usuario
│   └── ...
├── lib/
│   └── supabase.ts         # Cliente y configuración de Supabase
└── ...
```

## 🔐 **Seguridad y Privacidad**

- **Datos encriptados**: Toda la comunicación es HTTPS
- **RLS habilitado**: Acceso restringido a datos propios
- **OAuth seguro**: Autenticación a través de Google
- **Sin contraseñas**: No almacenamos credenciales
- **GDPR compliant**: Cumple con regulaciones de privacidad

¡El sistema está listo para producción y escalabilidad! 🚀