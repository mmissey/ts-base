export const fromUserApi = (apiUser: ApiUser): User => {
    return {
        id: apiUser.id,
        url: apiUser.url,
        bio: apiUser.bio,
        avatar: apiUser.avatar,
    }
};

export const fromUserApiArray = (apiJobs: ApiUser[]): User[] =>
  apiJobs.map(fromUserApi);

