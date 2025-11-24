# 🚀 Deploy Live Shopify - Sistema SOS

## 🎯 **Objetivo: Página SOS Live en Producción**

---

## 📁 **Archivos para Deploy Live**

### ✅ **Archivos Clave**
1. **`cultimed-testing-base/templates/page.test-sos.json`**
   - Endpoint: `https://web-production-7d220.up.railway.app/api/sos`

2. **`cultimed-testing-base/sections/cultimed-sos.liquid`**
   - Formulario completo con UI mejorada
   - JavaScript para mostrar documentos
   - CSS profesional

---

## 🚀 **Pasos para Deploy Live**

### **Opción 1: Shopify CLI (Recomendado)**
```bash
# 1. Entrar a la carpeta del theme
cd cultimed-testing-base

# 2. Conectar a tienda live
shopify login --store cultimed.cl

# 3. Deploy al theme live
shopify theme push --live

# 4. Verificar URL
# https://cultimed.cl/pages/sos
```

### **Opción 2: Shopify Dashboard**
1. **Ir a:** https://cultimed.cl/admin
2. **Online Store → Themes**
3. **Editar theme "Live"**
4. **Añadir nueva página:** "SOS"
5. **Seleccionar template:** "page.test-sos"
6. **Publicar cambios**

---

## 🌐 **URL Final Live**

**Página SOS Live:** https://cultimed.cl/pages/sos

---

## 🧪 **Tests en Producción Live**

### **Pacientes de Prueba**
- **Con documentos**: 17.797.136-7 / orellanaf784@gmail.com
- **Sin documentos**: 10.260.672-8 / cnavarro@corrupac.cl
- **No encontrado**: 11.111.111-1 / noexiste@test.com

### **Verificar Funcionalidad**
1. ✅ Carga correcta del formulario
2. ✅ Búsqueda por RUT/email
3. ✅ Display de información del paciente
4. ✅ Links a documentos funcionando
5. ✅ Manejo de errores

---

## 📊 **Monitoreo Post-Deploy**

### **Verificar**
- **Google Analytics** - tráfico a /pages/sos
- **Shopify Analytics** - uso del formulario
- **Railway logs** - requests al endpoint
- **Console errors** - si hay problemas

---

## 🎉 **Resultado Esperado**

**La página SOS estará:**
- ✅ **Live en cultimed.cl**
- ✅ **Funcional con datos reales**
- ✅ **Profesional y responsive**
- ✅ **Lista para uso real**

---

## 📞 **Soporte Post-Launch**

### **Si algo falla:**
1. **Test endpoint:** https://web-production-7d220.up.railway.app/api/test
2. **Revisar console:** F12 en browser
3. **Verificar logs:** Railway dashboard
4. **Rollback:** Revertir cambios si es necesario

---

## 🚀 **¡Listo para Launch!**

**Comando final:**
```bash
cd cultimed-testing-base
shopify theme push --live
```

**Resultado:** https://cultimed.cl/pages/sos 🎉
