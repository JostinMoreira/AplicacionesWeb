-- Crear tabla de comentarios
CREATE TABLE IF NOT EXISTS comentarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contenido TEXT NOT NULL,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  publicacion_id UUID REFERENCES publicaciones(id) ON DELETE CASCADE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de likes si no existe
CREATE TABLE IF NOT EXISTS likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  publicacion_id UUID REFERENCES publicaciones(id) ON DELETE CASCADE,
  fecha_like TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(usuario_id, publicacion_id)
);

-- Agregar campo de password a usuarios si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'usuarios' AND column_name = 'password') THEN
        ALTER TABLE usuarios ADD COLUMN password VARCHAR(255);
    END IF;
END $$;

-- Habilitar RLS para las nuevas tablas
ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

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

-- Crear políticas simples para todas las tablas
-- Usuarios
DROP POLICY IF EXISTS "Usuarios: SELECT público" ON usuarios;
DROP POLICY IF EXISTS "Usuarios: INSERT público" ON usuarios;
DROP POLICY IF EXISTS "Usuarios: UPDATE público" ON usuarios;
DROP POLICY IF EXISTS "Usuarios: DELETE público" ON usuarios;

CREATE POLICY "Usuarios: Acceso completo" ON usuarios FOR ALL USING (true) WITH CHECK (true);

-- Publicaciones
DROP POLICY IF EXISTS "Publicaciones: SELECT público" ON publicaciones;
DROP POLICY IF EXISTS "Publicaciones: INSERT público" ON publicaciones;
DROP POLICY IF EXISTS "Publicaciones: UPDATE público" ON publicaciones;
DROP POLICY IF EXISTS "Publicaciones: DELETE público" ON publicaciones;

CREATE POLICY "Publicaciones: Acceso completo" ON publicaciones FOR ALL USING (true) WITH CHECK (true);

-- Comentarios
CREATE POLICY "Comentarios: Acceso completo" ON comentarios FOR ALL USING (true) WITH CHECK (true);

-- Likes
CREATE POLICY "Likes: Acceso completo" ON likes FOR ALL USING (true) WITH CHECK (true);
