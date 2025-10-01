# 🚀 Workflow de Deployment - Marketing Simulator

## Estructura de Ramas

### `main` - Desarrollo
- Rama principal para desarrollo
- Aquí se hacen todos los cambios y nuevas features
- Se testea localmente antes de mergear a prod

### `prod` - Producción  
- Rama que refleja lo que está en producción
- Solo se mergea código estable y testeado desde `main`
- Automaticamente deploya a GitHub Pages

## 📋 Proceso de Deployment

### 1. Desarrollo en `main`
```bash
git checkout main
# Hacer cambios...
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

### 2. Mergear a producción
```bash
# Cuando esté listo para producción
git checkout prod
git merge main
git push origin prod
```

### 3. Deployment Automático
- Al hacer push a `prod`, GitHub Actions automáticamente:
  - Instala dependencias
  - Ejecuta tests (si los hay)
  - Construye la aplicación para producción
  - Deploya a GitHub Pages

## 🔧 Comandos Útiles

### Desarrollo local
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build local
npm run build:prod   # Build para producción
```

### Git workflow
```bash
# Cambiar a main y actualizar
git checkout main
git pull origin main

# Crear nueva feature
git checkout -b feature/nueva-funcionalidad
# ... hacer cambios ...
git push origin feature/nueva-funcionalidad

# Mergear a main (via PR o directo)
git checkout main
git merge feature/nueva-funcionalidad

# Deployar a producción
git checkout prod
git pull origin prod
git merge main
git push origin prod
```

## 🌐 URLs

- **Desarrollo**: http://localhost:3000
- **Producción**: http://deepcore.com.ar

## ⚙️ Configuración GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `prod` / `/ (root)`
5. Save

## 🔐 Variables de Entorno

Para producción, las variables de EmailJS deben configurarse en:
- Localmente: `.env.local` 
- GitHub Actions: Repository Settings → Secrets and variables → Actions

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```
