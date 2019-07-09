import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio = ""} = args;
            const exists = await prisma.$exists.user({ username });
            if (exists) {
                throw Error("既に存在しているユーザーネームです。");
            }
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
};