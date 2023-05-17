import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth/next";

import { ErrorMessage } from "../shared/enum/ErrorMessage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { BadRequestException } from "../shared/exceptions/BadRequest.exception";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);
    }

    return currentUser;
  } catch (error) {
    throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);
  }
}
