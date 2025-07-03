# Sistema CRUD - React + TypeScript + Supabase

Práctica universitaria de desarrollo colaborativo implementando un sistema CRUD completo.

## 🎯 Entidades Implementadas

### Usuario
- **Responsable**: [Tu nombre]
- **Campos**: id, nombre, correo, rol, fecha_registro, activo
- **Funcionalidades**: Crear, leer, actualizar, eliminar usuarios

### Publicación  
- **Responsable**: [Tu nombre]
- **Campos**: id, titulo, contenido, autor_id, fecha_creacion, fecha_actualizacion, estado, tags
- **Funcionalidades**: Crear, leer, actualizar, eliminar publicaciones

## 🚀 Configuración

1. **Clonar el repositorio**
\`\`\`bash
git clone [tu-repositorio]
cd supabase-crud-app
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar Supabase**
   - Crear proyecto en [Supabase](https://supabase.com)
   - Ejecutar el script SQL en `scripts/create-tables.sql`
   - Actualizar las credenciales en los archivos de servicio:
     - `src/services/usuarioService.ts`
     - `src/services/publicacionService.ts`

4. **Ejecutar la aplicación**
\`\`\`bash
npm run dev
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
src/
├── types/
│   ├── Usuario.ts
│   └── Publicacion.ts
├── services/
│   ├── usuarioService.ts
│   └── publicacionService.ts
├── components/
│   ├── UsuarioList.tsx
│   ├── UsuarioForm.tsx
│   ├── PublicacionList.tsx
│   └── PublicacionForm.tsx
├── pages/
│   ├── UsuariosPage.tsx
│   └── PublicacionesPage.tsx
└── App.tsx
\`\`\`

## 🛠 Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Backend**: Supabase (PostgreSQL + API REST)
- **Bundler**: Vite
- **Estilos**: CSS3 (Responsive Design)

## 👥 Integrantes del Equipo

- **Jostin Antonio Moreira Zambrano**: Implementación de entidades Publicación
- **Javier Zamora**: Implementación de entidades Usuarios

## 📝 Funcionalidades

### ✅ Usuarios
- [x] Listar usuarios
- [x] Crear nuevo usuario
- [x] Editar usuario existente
- [x] Eliminar usuario
- [x] Validación de formularios
- [x] Manejo de errores

### ✅ Publicaciones
- [x] Listar publicaciones
- [x] Crear nueva publicación
- [x] Editar publicación existente
- [x] Eliminar publicación
- [x] Sistema de tags
- [x] Estados de publicación
- [x] Validación de formularios
- [x] Manejo de errores

## 🔒 Seguridad

- Row Level Security (RLS) habilitado
- Políticas de acceso configuradas
- Validación en frontend y backend

## 📱 Responsive Design

La aplicación es completamente responsive y se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Despliegue

Para construir la aplicación para producción:

\`\`\`bash
npm run build
\`\`\`

Los archivos se generarán en la carpeta `dist/`.
