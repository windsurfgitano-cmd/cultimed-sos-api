// Servidor SOS con datos locales (FUNCIONA SIN GOOGLE SHEETS API)
const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Cache para pacientes
let pacientesCache = [];

// Función para normalizar RUT
function normalizarRut(valor) {
  if (!valor) return '';
  return valor.toString().toLowerCase().replace(/[.\-\\s]/g, '');
}

// Cargar datos del CSV
function cargarPacientes() {
  return new Promise((resolve, reject) => {
    const pacientes = [];
    
    fs.createReadStream('pacientes_sos_corregido.csv')
      .pipe(csv())
      .on('data', (row) => {
        pacientes.push(row);
      })
      .on('end', () => {
        console.log(`✅ Cargados ${pacientes.length} pacientes desde CSV`);
        pacientesCache = pacientes;
        resolve(pacientes);
      })
      .on('error', (error) => {
        console.error('❌ Error leyendo CSV:', error);
        reject(error);
      });
  });
}

// Endpoint principal SOS
app.post('/api/sos', async (req, res) => {
  try {
    console.log('📨 Request recibida:', req.body);
    
    const { rut, email } = req.body;
    const rutNormalizado = normalizarRut(rut);
    const emailNormalizado = email ? email.toLowerCase().trim() : '';

    // Validar
    if (!rutNormalizado || !emailNormalizado) {
      return res.json({
        status: 'error',
        message: 'Faltan RUT o correo'
      });
    }

    // Si el cache está vacío, cargar datos
    if (pacientesCache.length === 0) {
      await cargarPacientes();
    }

    // Buscar paciente en el cache
    const paciente = pacientesCache.find(p => {
      const rutSheet = normalizarRut(p.rut_normalizado);
      const emailSheet = p.correo ? p.correo.toLowerCase().trim() : '';
      return rutSheet === rutNormalizado && emailSheet === emailNormalizado;
    });

    if (!paciente) {
      console.log('❌ Paciente no encontrado:', { rut: rutNormalizado, email: emailNormalizado });
      return res.json({
        status: 'not_found',
        message: 'Paciente no encontrado'
      });
    }

    // Construir respuesta
    const record = {
      rut_normalizado: paciente.rut_normalizado || '',
      correo: paciente.correo || '',
      nombre: paciente.nombre || '',
      telefono: paciente.telefono || '',
      estado_aprobacion: paciente.estado_aprobacion || '',
      notas: paciente.notas || '',
      // Documentos
      foto_frontal_carnet: paciente.foto_frontal_carnet || '',
      foto_trasera_carnet: paciente.foto_trasera_carnet || '',
      certificado_antecedentes: paciente.certificado_antecedentes || '',
      comprobante_transferencia: paciente.comprobante_transferencia || '',
      receta_medica: paciente.receta_medica || '',
      documento_cesion_derechos: paciente.documento_cesion_derechos || ''
    };

    // Verificar si tiene documentos
    const tieneDocs = [
      record.foto_frontal_carnet,
      record.foto_trasera_carnet,
      record.certificado_antecedentes,
      record.comprobante_transferencia,
      record.receta_medica,
      record.documento_cesion_derechos
    ].some(doc => doc && doc.toString().trim().length > 0);

    record.tiene_documentos = tieneDocs;

    console.log('✅ Paciente encontrado:', record.nombre);

    res.json({
      status: 'ok',
      record: record
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.json({
      status: 'error',
      message: error.message
    });
  }
});

// Endpoint de test
app.get('/api/test', (req, res) => {
  res.json({
    status: 'test',
    message: 'SOS Server funcionando (modo local)',
    timestamp: new Date().toISOString(),
    endpoint: '/api/sos',
    pacientes_cargados: pacientesCache.length
  });
});

// Endpoint para recargar datos
app.post('/api/reload', async (req, res) => {
  try {
    await cargarPacientes();
    res.json({
      status: 'ok',
      message: 'Datos recargados',
      pacientes: pacientesCache.length
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});

// Servir frontend de test
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test_frontend.html'));
});

// Iniciar servidor y cargar datos
async function startServer() {
  try {
    await cargarPacientes();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor SOS corriendo en http://localhost:${PORT}`);
      console.log(`📡 Endpoint: http://localhost:${PORT}/api/sos`);
      console.log(`🧪 Test: http://localhost:${PORT}/test`);
      console.log(`📊 Pacientes cargados: ${pacientesCache.length}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
  }
}

startServer();

module.exports = app;
