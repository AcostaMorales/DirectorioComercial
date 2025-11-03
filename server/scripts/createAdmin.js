const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const createDefaultAdmin = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/directorio-comercial', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existe un admin
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('⚠️  Ya existe un administrador en la base de datos');
      console.log(`👤 Usuario: ${existingAdmin.username}`);
      process.exit(0);
    }

    // Crear admin por defecto
    const defaultAdmin = new Admin({
      username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
      password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'
    });

    await defaultAdmin.save();

    console.log('🎉 Administrador por defecto creado exitosamente');
    console.log(`👤 Usuario: ${defaultAdmin.username}`);
    console.log(`🔑 Contraseña: ${process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'}`);
    console.log('');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');

  } catch (error) {
    console.error('❌ Error creando administrador por defecto:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createDefaultAdmin();