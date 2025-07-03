"use client"

import type React from "react"
import { DatabaseStatus } from "../components/DatabaseStatus"

export const SetupPage: React.FC = () => {
  return (
    <div className="setup-page">
      <div className="setup-container">
        <h1>🛠️ Configuración del Sistema</h1>
        <p>Antes de usar la aplicación, necesitas configurar la base de datos.</p>

        <div className="setup-steps">
          <div className="setup-step">
            <h3>📋 Paso 1: Crear Tablas</h3>
            <p>Ejecuta este script en el SQL Editor de Supabase:</p>
            <div className="code-block">
              <code>scripts/create-comments-table.sql</code>
            </div>
            <details>
              <summary>Ver código SQL completo</summary>
              <div className="code-block">
                <pre>{`-- Crear tabla de comentarios
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

-- Crear políticas simples para todas las tablas
CREATE POLICY "Usuarios: Acceso completo" ON usuarios FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Publicaciones: Acceso completo" ON publicaciones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Comentarios: Acceso completo" ON comentarios FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Likes: Acceso completo" ON likes FOR ALL USING (true) WITH CHECK (true);`}</pre>
              </div>
            </details>
          </div>

          <div className="setup-step">
            <h3>🔍 Paso 2: Verificar Instalación</h3>
            <DatabaseStatus />
          </div>

          <div className="setup-step">
            <h3>📊 Paso 3: Datos de Prueba (Opcional)</h3>
            <p>Para agregar datos de prueba, ejecuta:</p>
            <div className="code-block">
              <code>scripts/insert-test-data.sql</code>
            </div>
            <details>
              <summary>Ver código SQL de datos de prueba</summary>
              <div className="code-block">
                <pre>{`-- Insertar usuarios de prueba (solo si no existen)
INSERT INTO usuarios (nombre, correo, rol, password, activo) 
SELECT * FROM (VALUES 
  ('Admin Sistema', 'admin@test.com', 'admin', '5d41402abc4b2a76b9719d911017c592', true),
  ('Moderador Test', 'moderador@test.com', 'moderador', '5d41402abc4b2a76b9719d911017c592', true),
  ('Editor Test', 'editor@test.com', 'editor', '5d41402abc4b2a76b9719d911017c592', true),
  ('Usuario Normal', 'usuario@test.com', 'usuario', '5d41402abc4b2a76b9719d911017c592', true)
) AS v(nombre, correo, rol, password, activo)
WHERE NOT EXISTS (
  SELECT 1 FROM usuarios WHERE correo = v.correo
);`}</pre>
              </div>
            </details>
            <small>
              <strong>Usuarios de prueba:</strong>
              <br />• admin@test.com (Admin) - password: hello
              <br />• moderador@test.com (Moderador) - password: hello
              <br />• editor@test.com (Editor) - password: hello
              <br />• usuario@test.com (Usuario) - password: hello
            </small>
          </div>

          <div className="setup-step">
            <h3>✅ Paso 4: ¡Listo para usar!</h3>
            <p>Una vez que hayas ejecutado los scripts y verificado que todo está bien:</p>
            <ul>
              <li>Haz clic en "Volver a la App"</li>
              <li>Inicia sesión con cualquiera de los usuarios de prueba</li>
              <li>¡Disfruta de tu aplicación CRUD completa!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
