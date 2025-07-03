-- Script para verificar que todas las tablas existen
SELECT 
  table_name,
  table_schema
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('usuarios', 'publicaciones', 'comentarios', 'likes')
ORDER BY table_name;

-- Verificar columnas de cada tabla
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('usuarios', 'publicaciones', 'comentarios', 'likes')
ORDER BY table_name, ordinal_position;

-- Verificar vistas
SELECT 
  table_name,
  table_schema
FROM information_schema.views 
WHERE table_schema = 'public' 
  AND table_name IN ('publicaciones_completas', 'comentarios_completos')
ORDER BY table_name;

-- Contar registros en cada tabla
SELECT 'usuarios' as tabla, COUNT(*) as total FROM usuarios
UNION ALL
SELECT 'publicaciones' as tabla, COUNT(*) as total FROM publicaciones
UNION ALL
SELECT 'comentarios' as tabla, COUNT(*) as total FROM comentarios
UNION ALL
SELECT 'likes' as tabla, COUNT(*) as total FROM likes;
