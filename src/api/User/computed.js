import { prisma } from "../../../generated/prisma-client";
import { exists } from "fs";

export default {
  User: {
    fullname: parent => {
      return `${parent.firstname} ${parent.lastname}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        });
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  },
  
};
