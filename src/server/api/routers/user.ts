import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hash = await bcrypt.hash(input.password, 10);
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      if (user) throw Error("User already exist!");
      return await ctx.db.user.create({
        data: {
          name: input.firstName + " " + input.lastName,
          profile: {
            create: {
              firstName: input.firstName,
              lastName: input.lastName,
              headline: "Dreamer",
            },
          },
          email: input.email,
          password: hash,
          notificationSettings: {
            create: {
              system: input.isReceiveNotification,
              course: input.isReceiveNotification,
              offer: input.isReceiveNotification,
            },
          },
        },
        select: {
          name: true,
          email: true,
        },
      });
    }),
});
