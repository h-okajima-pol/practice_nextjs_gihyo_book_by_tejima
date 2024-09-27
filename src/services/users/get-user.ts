import type { ApiContext, User } from "@/types/data";
import { fetcher } from "@/utils";
import { checkUser } from "@/utils/type/guard";

export type GetUserParams = {
    id: number;
}

const getUser = async (
    context: ApiContext,
    { id }: GetUserParams,
): Promise<User> => {
    const user = await fetcher(
        `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
    )

    if (!checkUser(user)) {
        throw new Error('ユーザーデータを取得できませんでした。');
    }
    
    return user;
}

export default getUser;