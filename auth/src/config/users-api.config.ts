export default (): { usersAPI: UsersAPIConfig } => ({
  usersAPI: {
    connection: {
      useSsl: process.env.USERS_API_USE_SSL === 'true' || false,
      host: process.env.USERS_API_HOST || '127.0.0.1',
      port: parseInt(process.env.USERS_API_PORT, 10) || 6000,
    },
    endpoints: {
      base: 'user',
    },
  },
});

export interface UsersAPIConfig {
  connection: UsersAPIConnection;
  endpoints: UsersAPIEndpointMap;
}

export interface UsersAPIConnection {
  useSsl: boolean;
  host: string;
  port: number;
}

export interface UsersAPIEndpointMap {
  base: string;
}
