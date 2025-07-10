import { config  } from 'dotenv'

config({ path: '.env.example'  });

function createConfig() {
    const configuration = {
        server: {
            port: process.env.PORT || 3000,
        },
        database: {
            host: process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek',
        },
        jwt: {}
    }

    return {
        get<T>(path: string, defaultValue?: T): T {
            const parts = path.split('.');
            let current: any = configuration;
          
            for (const part of parts) {
                if (current === undefined || current === null)
                    return defaultValue as T;
                current = current[part];
            }
      
            return (current !== undefined && current !== null)
                ? current
                : defaultValue as T;
        }
    }
};

const configApi = createConfig();

export { configApi };

