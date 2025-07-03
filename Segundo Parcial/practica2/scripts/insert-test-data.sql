-- Insertar datos de prueba para verificar que todo funciona

-- Insertar usuarios de prueba (solo si no existen)
INSERT INTO usuarios (nombre, correo, rol, password, activo) 
SELECT * FROM (VALUES 
  ('Admin Sistema', 'admin@test.com', 'admin', '5d41402abc4b2a76b9719d911017c592', true),
  ('Moderador Test', 'moderador@test.com', 'moderador', '5d41402abc4b2a76b9719d911017c592', true),
  ('Editor Test', 'editor@test.com', 'editor', '5d41402abc4b2a76b9719d911017c592', true),
  ('Usuario Normal', 'usuario@test.com', 'usuario', '5d41402abc4b2a76b9719d911017c592', true)
) AS v(nombre, correo, rol, password, activo)
WHERE NOT EXISTS (
  SELECT 1 FROM usuarios WHERE correo = v.correo
);

-- Insertar publicaciones de prueba
INSERT INTO publicaciones (titulo, contenido, autor_id, estado, tags)
SELECT 
  'Publicación de Prueba',
  'Este es el contenido de una publicación de prueba para verificar que el sistema funciona correctamente.',
  u.id,
  'publicado',
  ARRAY['prueba', 'test', 'sistema']
FROM usuarios u 
WHERE u.correo = 'admin@test.com'
AND NOT EXISTS (
  SELECT 1 FROM publicaciones WHERE titulo = 'Publicación de Prueba'
);

-- Verificar que los datos se insertaron correctamente
SELECT 'Usuarios creados:' as info, COUNT(*) as total FROM usuarios;
SELECT 'Publicaciones creadas:' as info, COUNT(*) as total FROM publicaciones;
