type GetApiTarget = (apiTarget?: any, nodeEnv?: string) => 'development' | 'staging' | 'production';

export const getApiTarget: GetApiTarget = (apiTarget= process.env.API_TARGET, nodeEnv= process.env.NODE_ENV) => {
  if (!apiTarget && nodeEnv) { return nodeEnv; }
  return apiTarget || 'production';
};

export default getApiTarget;