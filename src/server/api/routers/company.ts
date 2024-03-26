import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const companyRouter = createTRPCRouter({
  getAllCompaniesData: publicProcedure.query(async ({ ctx }) => {
    const companies = await ctx.db.company.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        industry: true,
        size: true,
        jobListings: {
          select: {
            id: true,
            title: true,
            description: true,
            requirements: true,
            location: true,
            type: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            expiresAt: true,
          },
        },
      },
    });

    if (!companies) {
      throw new Error("No companies found");
    }

    return companies;
  }),
});
