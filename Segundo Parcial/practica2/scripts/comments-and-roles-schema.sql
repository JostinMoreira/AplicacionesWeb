-- Crear tabla de comentarios
CREATE TABLE IF NOT EXISTS comentarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contenido TEXT NOT NULL,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  publicacion_id UUID REFERENCES publicaciones(id) ON DELETE CASCADE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para comentarios
ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para comentarios
CREATE POLICY "Comentarios: SELECT público" ON comentarios FOR SELECT USING (true);
CREATE POLICY "Comentarios: INSERT público" ON comentarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Comentarios: UPDATE propio" ON comentarios FOR UPDATE USING (auth.uid()::text = usuario_id::text);
CREATE POLICY "Comentarios: DELETE propio o admin" ON comentarios FOR DELETE USING (
  auth.uid()::text = usuario_id::text OR 
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid()::text AND rol IN ('admin', 'moderador', 'editor'))
);

-- Crear vista para comentarios con información del usuario
CREATE OR REPLACE VIEW comentarios_completos AS
SELECT 
  c.*,
  u.nombre as usuario_nombre,
  u.correo as usuario_correo
FROM comentarios c
LEFT JOIN usuarios u ON c.usuario_id = u.id
ORDER BY c.fecha_creacion ASC;

-- Actualizar vista de publicaciones para incluir conteo de comentarios
DROP VIEW IF EXISTS publicaciones_completas;
CREATE OR REPLACE VIEW publicaciones_completas AS
SELECT 
  p.*,
  u.nombre as autor_nombre,
  u.correo as autor_correo,
  COALESCE(l.total_likes, 0) as total_likes,
  COALESCE(c.total_comentarios, 0) as total_comentarios
FROM publicaciones p
LEFT JOIN usuarios u ON p.autor_id = u.id
LEFT JOIN (
  SELECT publicacion_id, COUNT(*) as total_likes
  FROM likes
  GROUP BY publicacion_id
) l ON p.id = l.publicacion_id
LEFT JOIN (
  SELECT publicacion_id, COUNT(*) as total_comentarios
  FROM comentarios
  GROUP BY publicacion_id
) c ON p.id = c.publicacion_id
ORDER BY p.fecha_creacion DESC;

-- Políticas RLS más estrictas para usuarios (solo admin, editor, moderador pueden gestionar)
DROP POLICY IF EXISTS "Usuarios: UPDATE público" ON usuarios;
DROP POLICY IF EXISTS "Usuarios: DELETE público" ON usuarios;

CREATE POLICY "Usuarios: UPDATE admin" ON usuarios FOR UPDATE USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid()::text AND rol IN ('admin', 'moderador', 'editor'))
);

CREATE POLICY "Usuarios: DELETE admin" ON usuarios FOR DELETE USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid()::text AND rol IN ('admin', 'moderador', 'editor'))
);
