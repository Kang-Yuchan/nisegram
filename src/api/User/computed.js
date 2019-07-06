import { prisma } from "../../../generated/prisma-client";
import { encodingExists } from "iconv-lite";

export default {
    User: {
        fullName: (parent) => {
           return `${parent.lastName} ${parent.firstName}`;
        
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [
                        {
                            id: user.id
                        }, 
                        { 
                            following_some: {
                                id: parentId
                            }
                        }
                    ]
                });
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId
        }
    }
};
