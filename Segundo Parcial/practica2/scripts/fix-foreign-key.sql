-- Opción 1: Hacer autor_id opcional (permitir NULL)
ALTER TABLE publicaciones 
ALTER COLUMN autor_id DROP NOT NULL;

-- Opción 2: Eliminar temporalmente la foreign key constraint
ALTER TABLE publicaciones 
DROP CONSTRAINT IF EXISTS publicaciones_autor_id_fkey;

-- Opción 3: Crear algunos usuarios de prueba
INSERT INTO usuarios (nombre, correo, rol) VALUES 
('Usuario Demo', 'demo@test.com', 'usuario'),
('Admin Demo', 'admin@test.com', 'admin'),
('Editor Demo', 'editor@test.com', 'editor');
