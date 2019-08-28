import { prisma } from "../../../../generated/prisma-client";
import { userInfo } from "os";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Query : {
        seeRooms: async (_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {user } = request;
            return prisma.rooms({
                where: {
                    participants_some: {
                        id: user.id
                    }
                }
            })
            .$fragment(ROOM_FRAGMENT);
        }
    }
}