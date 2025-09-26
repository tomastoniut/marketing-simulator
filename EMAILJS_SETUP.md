# 📧 Configuración de EmailJS

## Setup rápido (5 minutos)

### 1. Crear cuenta en EmailJS
1. Ve a [emailjs.com](https://www.emailjs.com/)
2. Crear cuenta gratuita
3. Verificar email

### 2. Configurar servicio de email
1. En dashboard → **Email Services** → **Add New Service**
2. Seleccionar proveedor (Gmail, Outlook, Yahoo, etc.)
3. Conectar tu cuenta de email
4. Copiar el **Service ID**

### 3. Crear template de email
1. **Email Templates** → **Create New Template**
2. Usar este template básico:

```
Subject: Resultados de Evaluación de Marketing

Hola {{to_name}},

Aquí tienes los resultados de tu evaluación:

**Puntuación Global:** {{global_score}}
**Categoría:** {{global_category}}

**Detalle completo:**
{{message}}

Saludos,
Universidad FASTA
```

3. Copiar el **Template ID**

### 4. Obtener Public Key
1. **Account** → **General** 
2. Copiar **Public Key**

### 5. Configurar variables de entorno
Crear archivo `.env.local`:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_tu_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_tu_id_aqui
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### 6. Reiniciar servidor
```bash
npm run dev
```

## 🎯 Variables del template

El servicio envía estos parámetros al template:
- `{{to_email}}` - Email del destinatario
- `{{to_name}}` - Nombre (por defecto "Usuario")  
- `{{subject}}` - Asunto del email
- `{{message}}` - Contenido completo con resultados
- `{{global_score}}` - Puntuación global (ej: "35/51")
- `{{global_category}}` - Categoría global

## 💰 Límites gratuitos
- **200 emails/mes** gratis
- Planes pagos desde $15/mes para más volumen

## 🔧 Troubleshooting

**Error "User ID not found":**
- Verificar que `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` esté correcto

**Email no llega:**
- Revisar carpeta spam
- Verificar que el servicio de email esté conectado
- Probar con template simple primero

**CORS errors:**
- EmailJS maneja CORS automáticamente desde el frontend
