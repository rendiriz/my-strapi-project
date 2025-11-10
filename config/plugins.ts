export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwtManagement: env("UP_JWT_MANAGEMENT", "refresh"),
      sessions: {
        accessTokenLifespan: env.int("UP_SESSIONS_ACCESS_TTL", 604800), // 1 week (default)
        maxRefreshTokenLifespan: env.int("UP_SESSIONS_MAX_REFRESH_TTL", 2592000), // 30 days
        idleRefreshTokenLifespan: env.int("UP_SESSIONS_IDLE_REFRESH_TTL", 604800), // 7 days
        httpOnly: env.bool("UP_SESSIONS_HTTPONLY", false), // Set to true for HTTP-only cookies
        cookie: {
          name: env("UP_SESSIONS_COOKIE_NAME", "strapi_up_refresh"),
          sameSite: env("UP_SESSIONS_COOKIE_SAMESITE", "lax"),
          path: env("UP_SESSIONS_COOKIE_PATH", "/"),
          secure: env.bool("UP_SESSIONS_COOKIE_SECURE", false), // true in production
        },
      },
    },
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        credentials: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
        },
        region: env("AWS_REGION", "us-east-1"),
        endpoint: env("AWS_ENDPOINT_URL_S3", "http://localhost:9000"),
        // forcePathStyle: true, // Required for MinIO
        params: {
          ACL: "private",
          signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
          Bucket: env("AWS_BUCKET", "strapi"),
        },
      },
    },
  },
  redis: {
    config: {
      settings: {
        debug: false,
        enableRedlock: true,
      },
      connections: {
        default: {
          connection: {
            host: env("REDIS_HOST"),
            port: env.int("REDIS_PORT", 6379),
            db: env.int("REDIS_DB", 0),
            username: env("REDIS_USERNAME"),
            password: env("REDIS_PASSWORD"),
            tls: env.bool("REDIS_TLS", false),
          },
          settings: {
            debug: false,
          },
        },
      },
    },
  },
  "rest-cache": {
    config: {
      provider: {
        name: "redis",
        options: {
          max: 32767,
          connection: "default",
        },
      },
      strategy: {
        contentTypes: [
          {
            contentType: "api::article.article",
            maxAge: 3600000,
          },
          {
            contentType: "api::category.category",
            maxAge: 3600000,
          },
          {
            contentType: "api::global.global",
            maxAge: 3600000,
          },
          {
            contentType: "api::organization.organization",
            maxAge: 3600000,
            hitpass: false,
          },
        ],
      },
    },
  },
  meilisearch: {
    config: {
      host: env("MEILI_HOST"),
      apiKey: env("MEILI_MASTER_KEY"),
    },
  },
});
