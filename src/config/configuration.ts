export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  address: '0.0.0.0',
  elasticsearch: {
    node: process.env.ELASTICSEARCH_NODE,
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  },
  queue: {
    host: process.env.QUEUE_HOST,
    port: process.env.QUEUE_PORT,
    username: process.env.QUEUE_USERNAME,
    password: process.env.QUEUE_PASSWORD
  },
  s3: {
    bucketEndpoint: process.env.S3_BUCKETENDPOINT,
    baseUrl: process.env.S3_CUSTOMDOMAIN,
    endpoint: process.env.S3_ENDPOINT,
    accessKey: process.env.S3_ACCESSKEY,
    secretKey: process.env.S3_SECRETKEY,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: false,
    logging: false,
    certificateAuthority: process.env.DATABASE_CA_CERT,
  },
  smtp: {
    transport: process.env.SMTP_TRANSPORT,
    from: process.env.SMTP_FROM,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
