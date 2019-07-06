import { prisma } from "../../../../generated/prisma-client";
import sgMail from "@sendgrid/mail";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const { email } = args;
            const loginSecret = generateSecret();
            try {
                await sgMail.send(sendSecretMail(email, loginSecret));
                await prisma.updateUser({ data: { loginSecret }, where: { email } });
                return true;
            } catch(error) {
                console.log(error);
                return false;
            }
        }
    }
};
