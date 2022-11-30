export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.API_PORT) || 5000,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // entities: [__dirname + '/../**/*.entity.{ts,js}'],
    autoLoadEntities: true,
    synchronize: false,
    logging: 'all',
  },
});
