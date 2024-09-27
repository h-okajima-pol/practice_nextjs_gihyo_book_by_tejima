import { User } from "@/types/data";

export const checkUser = (obj:unknown): obj is User => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const hasUserKeys = (
        'id' in obj &&
        'username' in obj &&
        'displayName' in obj &&
        'email' in obj &&
        'profileImageUrl' in obj &&
        'description' in obj
    );

    if (!hasUserKeys) {
        return false;
    }

    return (
        typeof obj.id === 'number' &&
        typeof obj.username === 'string' &&
        typeof obj.displayName === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.profileImageUrl === 'string' &&
        typeof obj.description === 'string'
    )
}