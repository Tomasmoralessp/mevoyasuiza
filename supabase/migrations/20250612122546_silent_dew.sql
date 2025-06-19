-- Verificar si el trigger existe y está activo
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    trigger_schema,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Verificar si la función existe
SELECT 
    routine_name,
    routine_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- Ver usuarios en auth.users vs user_profiles para detectar discrepancias
SELECT 
    'auth.users' as tabla,
    count(*) as total
FROM auth.users
UNION ALL
SELECT 
    'user_profiles' as tabla,
    count(*) as total
FROM user_profiles;