-- Agregar tabla de likes
CREATE TABLE IF NOT EXISTS likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  publicacion_id UUID REFERENCES publicaciones(id) ON DELETE CASCADE,
  fecha_like TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(usuario_id, publicacion_id)
);

-- Agregar campo de password a usuarios (para autenticación simple)
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- Habilitar RLS para likes
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para likes
CREATE POLICY "Likes: SELECT público" ON likes FOR SELECT USING (true);
CREATE POLICY "Likes: INSERT público" ON likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Likes: DELETE público" ON likes FOR DELETE USING (true);

-- Crear vista para publicaciones con información del usuario y conteo de likes
CREATE OR REPLACE VIEW publicaciones_completas AS
SELECT 
  p.*,
  u.nombre as autor_nombre,
  u.correo as autor_correo,
  COALESCE(l.total_likes, 0) as total_likes
FROM publicaciones p
LEFT JOIN usuarios u ON p.autor_id = u.id
LEFT JOIN (
  SELECT publicacion_id, COUNT(*) as total_likes
  FROM likes
  GROUP BY publicacion_id
) l ON p.id = l.publicacion_id
ORDER BY p.fecha_creacion DESC;

-- Habilitar RLS para la vista
ALTER VIEW publicaciones_completas OWNER TO postgres;
