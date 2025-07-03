-- Script básico para probar la conexión y estructura
-- Ejecuta este script para verificar que todo funciona

-- 1. Verificar que las tablas principales existen
SELECT COUNT(*) as total_usuarios FROM usuarios;
SELECT COUNT(*) as total_publicaciones FROM publicaciones;

-- 2. Intentar crear un usuario de prueba
INSERT INTO usuarios (nombre, correo, rol, password) 
VALUES ('Test User', 'test@example.com', 'usuario', 'test123')
ON CONFLICT (correo) DO NOTHING;

-- 3. Verificar que se puede leer el usuario
SELECT id, nombre, correo, rol FROM usuarios WHERE correo = 'test@example.com';

-- 4. Limpiar el usuario de prueba
DELETE FROM usuarios WHERE correo = 'test@example.com';

-- Si todos estos comandos se ejecutan sin error, la base de datos está configurada correctamente
SELECT '✅ Base de datos configurada correctamente' as resultado;
