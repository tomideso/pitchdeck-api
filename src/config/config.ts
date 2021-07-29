export const JWT_CONFIG = {
  jwtSecret: "@QEGTUI",
  token_expiration: 3600,
};

export const DB_CONFIG = {
  port: process.env.PORT || 8000,
  mongoUrl: process.env.DATABASE_URL,
  bodyLimit: "40kb",
};
