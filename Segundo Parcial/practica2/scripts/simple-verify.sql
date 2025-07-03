-- Script simple para verificar tablas
SELECT 'usuarios' as tabla, 
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'usuarios') 
            THEN '✅ Existe' 
            ELSE '❌ No existe' 
       END as estado
UNION ALL
SELECT 'publicaciones' as tabla,
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'publicaciones') 
            THEN '✅ Existe' 
            ELSE '❌ No existe' 
       END as estado
UNION ALL
SELECT 'comentarios' as tabla,
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'comentarios') 
            THEN '✅ Existe' 
            ELSE '❌ No existe' 
       END as estado
UNION ALL
SELECT 'likes' as tabla,
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'likes') 
            THEN '✅ Existe' 
            ELSE '❌ No existe' 
       END as estado;

-- Verificar vistas
SELECT 'publicaciones_completas' as vista,
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.views WHERE table_name = 'publicaciones_completas') 
            THEN '✅ Existe' 
            ELSE '❌ No existe' 
       END as estado
UNION ALL
SELECT 'comentarios_completos' as vista,
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.views WHERE table_name = 'comentarios_completos') 
            THEN '✅ Existe' 
            ELSE '❌ No existe' 
       END as estado;
