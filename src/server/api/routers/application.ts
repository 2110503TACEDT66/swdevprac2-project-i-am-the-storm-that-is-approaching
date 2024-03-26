import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const applicationRouter = createTRPCRouter({
  // Create a new application
  createApplication: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        jobListingId: z.string(),
        reservedAt: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newApplication = await ctx.db.application.create({
        data: {
          userId: input.userId,
          jobListingId: input.jobListingId,
          reservedAt: input.reservedAt,
        },
      });

      return newApplication;
    }),

  updateApplicationReservedAt: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        newReservedAt: z.string(), // Assuming you want to update this field
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedApplication = await ctx.db.application.update({
        where: { id: input.applicationId },
        data: { reservedAt: input.newReservedAt },
      });

      if (!updatedApplication) {
        throw new Error(`Application with ID ${input.applicationId} not found`);
      }

      return updatedApplication;
    }),

  // Get applications for a specific job listing
  getApplicationsForJobListing: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const applications = await ctx.db.application.findMany({
        where: { jobListingId: input },
        include: {
          user: true, // Assuming you want to include some user details
          jobListing: true, // And details about the job listing
        },
      });

      if (applications.length === 0) {
        throw new Error(`No applications found for job listing ID ${input}`);
      }

      return applications;
    }),

  // Get applications for a specific user
  getApplicationsForUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const applications = await ctx.db.application.findMany({
        where: { userId: input },
        include: {
          jobListing: true, // Including job listing details might be useful here
        },
      });

      if (applications.length === 0) {
        throw new Error(`No applications found for user ID ${input}`);
      }

      return applications;
    }),
});
