import { ApiContext, User } from "@/types/data";
import { fetcher } from "@/utils";
import { checkUser } from "@/utils/type/guard";

export type SigninParams = {
    username: string;
    password: string;
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