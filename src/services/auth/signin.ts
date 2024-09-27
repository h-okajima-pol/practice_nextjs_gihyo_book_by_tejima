import { ApiContext, User } from "@/types/data";
import { fetcher } from "@/utils";

export type SigninParams = {
    username: string;
    password: string;
}

const checkUser = (obj:unknown): obj is User => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const hasRequiredKeys = (
        'id' in obj &&
        'username' in obj &&
        'displayName' in obj &&
        'email' in obj &&
        'profileImageUrl' in obj &&
        'description' in obj
    );

    if (!hasRequiredKeys) {
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

const signin = async (
    context: ApiContext,
    params: SigninParams
): Promise<User> => {
    const user = await fetcher(
        `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        },
    )

    if (!checkUser(user)) {
        throw new Error('ユーザーデータを取得できませんでした。');
    }
    
    return user;
}

export default signin;