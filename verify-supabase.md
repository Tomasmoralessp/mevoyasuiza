# 🔍 Verificación de Configuración de Supabase

## ✅ **Checklist de Verificación**

### **1. Variables de Entorno**
- [ ] `VITE_SUPABASE_URL` configurada en `.env`
- [ ] `VITE_SUPABASE_ANON_KEY` configurada en `.env`

### **2. Autenticación con Google**
- [ ] Provider de Google habilitado en Supabase
- [ ] Client ID y Client Secret configurados
- [ ] URL de redirección configurada

### **3. Tablas de Base de Datos**
- [ ] Tabla `user_profiles` creada
- [ ] Tabla `user_progress` creada
- [ ] Columnas correctas en ambas tablas

### **4. Triggers y Funciones**
- [ ] Función `handle_new_user()` creada
- [ ] Trigger `on_auth_user_created` activo
- [ ] Función `update_updated_at_column()` creada
- [ ] Triggers de timestamp activos

### **5. Row Level Security (RLS)**
- [ ] RLS habilitado en `user_profiles`
- [ ] RLS habilitado en `user_progress`
- [ ] Políticas de seguridad configuradas

---

## 🛠️ **Pasos para Verificar en Supabase Dashboard**

### **Paso 1: Verificar Autenticación**
1. Ve a **Authentication** → **Providers**
2. Verifica que **Google** esté habilitado
3. Comprueba que tienes Client ID y Client Secret configurados

### **Paso 2: Verificar Tablas**
1. Ve a **Table Editor**
2. Verifica que existen estas tablas:
   - `user_profiles`
   - `user_progress`

### **Paso 3: Verificar Estructura de `user_profiles`**
```sql
-- Debería tener estas columnas:
id (uuid, primary key)
email (text)
full_name (text, nullable)
avatar_url (text, nullable)
target_move_date (date, nullable)
target_canton (text, nullable)
current_phase (text, default: 'antes-de-irte')
onboarding_completed (boolean, default: false)
created_at (timestamptz, default: now())
updated_at (timestamptz, default: now())
```

### **Paso 4: Verificar Estructura de `user_progress`**
```sql
-- Debería tener estas columnas:
id (uuid, primary key, default: gen_random_uuid())
user_id (uuid, foreign key a user_profiles)
task_id (text)
status (text, check: 'blocked', 'active', 'completed')
notes (text, nullable)
uploaded_file_name (text, nullable)
uploaded_file_url (text, nullable)
completed_at (timestamptz, nullable)
created_at (timestamptz, default: now())
updated_at (timestamptz, default: now())
```

### **Paso 5: Verificar Funciones**
1. Ve a **Database** → **Functions**
2. Verifica que existen:
   - `handle_new_user()`
   - `update_updated_at_column()`

### **Paso 6: Verificar Triggers**
1. Ve a **Database** → **Triggers**
2. Verifica que existen:
   - `on_auth_user_created` en tabla `auth.users`
   - `update_user_profiles_updated_at` en tabla `user_profiles`
   - `update_user_progress_updated_at` en tabla `user_progress`

### **Paso 7: Verificar RLS**
1. Ve a **Authentication** → **Policies**
2. Verifica políticas para `user_profiles`:
   - "Users can view own profile" (SELECT)
   - "Users can update own profile" (UPDATE)
   - "Users can insert own profile" (INSERT)
3. Verifica políticas para `user_progress`:
   - "Users can view own progress" (SELECT)
   - "Users can insert own progress" (INSERT)
   - "Users can update own progress" (UPDATE)
   - "Users can delete own progress" (DELETE)

---

## 🧪 **Pruebas de Funcionamiento**

### **Test 1: Registro de Usuario**
1. Inicia sesión con Google en la app
2. Ve a **Table Editor** → `user_profiles`
3. Verifica que aparece tu usuario con datos de Google

### **Test 2: Onboarding**
1. Completa el modal de onboarding
2. Verifica que se actualiza `target_move_date`, `target_canton` y `onboarding_completed`

### **Test 3: Progreso de Tareas**
1. Marca algunas tareas como completadas
2. Ve a **Table Editor** → `user_progress`
3. Verifica que aparecen las entradas con tu progreso

### **Test 4: Timestamps Automáticos**
1. Actualiza tu perfil o progreso
2. Verifica que `updated_at` se actualiza automáticamente

---

## 🚨 **Problemas Comunes y Soluciones**

### **Error: "Missing Supabase environment variables"**
- Verifica que `.env` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo

### **Error: "Invalid login credentials"**
- Verifica configuración de Google OAuth
- Comprueba que la URL de redirección es correcta

### **Error: "Row Level Security policy violation"**
- Verifica que las políticas RLS están configuradas
- Comprueba que el usuario está autenticado

### **Error: "relation does not exist"**
- Ejecuta las migraciones de base de datos
- Verifica que las tablas se crearon correctamente

---

## 📋 **SQL para Verificar Configuración**

```sql
-- Verificar que las tablas existen
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'user_progress');

-- Verificar que las funciones existen
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('handle_new_user', 'update_updated_at_column');

-- Verificar que RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('user_profiles', 'user_progress');

-- Verificar políticas RLS
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('user_profiles', 'user_progress');
```

---

## ✅ **Confirmación Final**

Una vez verificado todo, deberías poder:
- ✅ Iniciar sesión con Google
- ✅ Completar el onboarding
- ✅ Ver tu progreso guardado en la base de datos
- ✅ Sincronizar entre dispositivos
- ✅ Ver timestamps actualizados automáticamente

Si algún punto falla, revisa la configuración correspondiente en Supabase.