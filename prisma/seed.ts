import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Users & Profiles
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice",
        password: "hashedpassword1",
        role: "candidate",
        profile: {
          create: {
            firstName: "Alice",
            lastName: "Doe",
            headline: "Software Engineer",
            bio: "Experienced Software Engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob",
        password: "hashedpassword2",
        role: "candidate",
        profile: {
          create: {
            firstName: "Bob",
            lastName: "Smith",
            headline: "Product Manager",
            bio: "Product Manager with over 10 years of experience in product development, project management, and team leadership.",
          },
        },
      },
    }),
  ]);

  // Companies & Job Listings
  const companyData = [
    {
      name: "Tech Innovations Inc",
      description:
        "A leading company in tech innovation, focusing on AI and ML solutions.",
      industry: "Technology",
      size: 500,
      jobListings: [
        {
          title: "Senior Software Engineer",
          description: "Develop and maintain advanced software applications.",
          requirements: "5+ years of experience in software development.",
          location: "Remote",
          type: "Full-time",
          status: "Open",
          expiresAt: new Date(2024, 3, 31),
        },
        {
          title: "Product Manager",
          description: "Lead the product development lifecycle.",
          requirements: "Proven experience as a Product Manager.",
          location: "New York, NY",
          type: "Full-time",
          status: "Open",
          expiresAt: new Date(2024, 4, 30),
        },
      ],
    },
    {
      name: "Green Energy Solutions",
      description:
        "Dedicated to providing sustainable energy solutions worldwide.",
      industry: "Renewable Energy",
      size: 200,
      jobListings: [
        {
          title: "Renewable Energy Engineer",
          description: "Design and implement renewable energy systems.",
          requirements:
            "Degree in Engineering and experience with renewable energy projects.",
          location: "San Francisco, CA",
          type: "Full-time",
          status: "Open",
          expiresAt: new Date(2024, 5, 20),
        },
      ],
    },
    {
      name: "Global FinTech Innovators",
      description:
        "Leading the digital revolution in financial technology services.",
      industry: "Financial Services",
      size: 1000,
      jobListings: [
      ],
    },
  ];

 for (const company of companyData) {
    await prisma.company.create({
        data: {
            name: company.name,
            description: company.description,
            industry: company.industry,
            size: company.size,
            jobListings: {
                create: company.jobListings,
            },
        },
    });
}

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });