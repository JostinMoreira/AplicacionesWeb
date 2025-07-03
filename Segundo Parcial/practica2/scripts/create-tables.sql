-- Crear tabla usuarios
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(255) UNIQUE NOT NULL,
  rol VARCHAR(50) DEFAULT 'usuario',
  fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  activo BOOLEAN DEFAULT true
);

-- Crear tabla publicaciones
CREATE TABLE publicaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT NOT NULL,
  autor_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estado VARCHAR(20) DEFAULT 'borrador',
  tags TEXT[]
);

-- Habilitar Row Level Security
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE publicaciones ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para usuarios
CREATE POLICY "Usuarios: SELECT público" ON usuarios FOR SELECT USING (true);
CREATE POLICY "Usuarios: INSERT público" ON usuarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Usuarios: UPDATE público" ON usuarios FOR UPDATE USING (true);
CREATE POLICY "Usuarios: DELETE público" ON usuarios FOR DELETE USING (true);

-- Políticas RLS para publicaciones
CREATE POLICY "Publicaciones: SELECT público" ON publicaciones FOR SELECT USING (true);
CREATE POLICY "Publicaciones: INSERT público" ON publicaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Publicaciones: UPDATE público" ON publicaciones FOR UPDATE USING (true);
CREATE POLICY "Publicaciones: DELETE público" ON publicaciones FOR DELETE USING (true);
