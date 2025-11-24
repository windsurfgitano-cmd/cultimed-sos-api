# 🛍️ Sincronizar Theme Shopify - Sistema SOS

## 📁 **Archivos para Sincronizar**

### ✅ **Archivos Modificados**
1. **`cultimed-testing-base/templates/page.test-sos.json`**
   - Endpoint actualizado: `https://web-production-7d220.up.railway.app/api/sos`

2. **`cultimed-testing-base/sections/cultimed-sos.liquid`**
   - JavaScript actualizado para mostrar documentos
   - CSS mejorado para display de información

---

## 🚀 **Pasos para Sincronizar**

### Opción 1: Shopify CLI (Recomendado)
```bash
# Desde la carpeta del theme
cd cultimed-testing-base
shopify theme push
```

### Opción 2: Manual (GitHub)
1. **Subir archivos a GitHub**
2. **Conectar GitHub a Shopify**
3. **Sincronizar desde dashboard**

### Opción 3: Shopify Dashboard
1. **Ir a: Online Store → Themes**
2. **Editar el theme actual**
3. **Reemplazar archivos modificados**
4. **Guardar y publicar**

---

## 🧪 **Para Probar Después de Sincronizar**

### 1. **Ir a la página SOS**
- URL: `https://tu-tienda.com/pages/test-sos`

### 2. **Probar con pacientes:**
- **Con documentos**: 17.797.136-7 / orellanaf784@gmail.com
- **Sin documentos**: 10.260.672-8 / cnavarro@corrupac.cl
- **No encontrado**: 11.111.111-1 / noexiste@test.com

### 3. **Verificar que muestre:**
- ✅ Información del paciente
- ✅ Links a documentos (si tiene)
- ✅ Mensajes de error claros

---

## 🎯 **Resultado Esperado**

El formulario debería:
1. **Aceptar RUT y email**
2. **Mostrar "Buscando..."**
3. **Desplegar información del paciente**
4. **Mostrar links a documentos si existen**
5. **Mostrar error si no encuentra**

---

## 📞 **Si Algo Falla**

### Verificar:
1. **Endpoint URL**: https://web-production-7d220.up.railway.app/api/sos
2. **Console errors**: F12 → Console
3. **Network tab**: Ver requests
4. **CORS errors**: Revisar headers

### Test directo:
```bash
curl https://web-production-7d220.up.railway.app/api/test
```

---

## 🎉 **Listo para Producción**

Una vez sincronizado:
- ✅ **Formulario funcional**
- ✅ **Datos reales de pacientes**
- ✅ **Documentos accesibles**
- ✅ **Manejo de errores robusto**

---

**🚀 Sincroniza el theme y el sistema SOS estará vivo!**
