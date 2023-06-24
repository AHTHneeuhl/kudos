import bcrypt from "bcryptjs";
import { prisma } from "./prisma.server";
import type { RegisterForm } from "./types.server";

export const createUser = async (user: RegisterForm) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  });

  return { id: newUser.id, email: user.email };
};
