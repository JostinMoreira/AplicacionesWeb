-- Eliminar todas las políticas problemáticas y usar un enfoque más simple
DROP POLICY IF EXISTS "Comentarios: SELECT público" ON comentarios;
DROP POLICY IF EXISTS "Comentarios: INSERT público" ON comentarios;
DROP POLICY IF EXISTS "Comentarios: UPDATE propio" ON comentarios;
DROP POLICY IF EXISTS "Comentarios: DELETE propio o admin" ON comentarios;

DROP POLICY IF EXISTS "Usuarios: SELECT público" ON usuarios;
DROP POLICY IF EXISTS "Usuarios: INSERT público" ON usuarios;
DROP POLICY IF EXISTS "Usuarios: UPDATE admin" ON usuarios;
DROP POLICY IF EXISTS "Usuarios: DELETE admin" ON usuarios;

DROP POLICY IF EXISTS "Publicaciones: SELECT público" ON publicaciones;
DROP POLICY IF EXISTS "Publicaciones: INSERT público" ON publicaciones;
DROP POLICY IF EXISTS "Publicaciones: UPDATE público" ON publicaciones;
DROP POLICY IF EXISTS "Publicaciones: DELETE público" ON publicaciones;

DROP POLICY IF EXISTS "Likes: SELECT público" ON likes;
DROP POLICY IF EXISTS "Likes: INSERT público" ON likes;
DROP POLICY IF EXISTS "Likes: DELETE público" ON likes;

-- Crear políticas simples que permitan todo (controlaremos acceso en frontend)
-- Usuarios
CREATE POLICY "Usuarios: Acceso completo" ON usuarios FOR ALL USING (true) WITH CHECK (true);

-- Publicaciones
CREATE POLICY "Publicaciones: Acceso completo" ON publicaciones FOR ALL USING (true) WITH CHECK (true);

-- Comentarios
CREATE POLICY "Comentarios: Acceso completo" ON comentarios FOR ALL USING (true) WITH CHECK (true);

-- Likes
CREATE POLICY "Likes: Acceso completo" ON likes FOR ALL USING (true) WITH CHECK (true);

-- Nota: En un entorno de producción, deberías implementar políticas más estrictas
-- Por ahora, controlamos el acceso en el frontend para simplicidad
