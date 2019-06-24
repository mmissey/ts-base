interface ApiUser {
    id: number,
    url: string,
    bio: string,
    avatar: string,
    avatar_name: string,
    cover: string,
    cover_name: string,
    reputation: number,
    reputation_name: string,
    created: number,
    pro_expiration: boolean,
    user_follow: {
        status: boolean
    },
    is_blocked: boolean 
}

interface User {
    id: number,
    url: string,
    bio: string,
    avatar: string,
}

type UsersMap = Record<string, User>