import bcrypt from "bcrypt";

import prisma from "@/lib/db";
import { fakerID_ID as faker } from "@faker-js/faker";

const main = async () => {
  await prisma.user.deleteMany({
    where: {
      NOT: {
        username: "zaamaulan",
      },
    },
  });
  await prisma.foto.deleteMany();
  await prisma.komentarFoto.deleteMany();

  for (let i = 0; i < 10; i++) {
    const hashedPassword = await bcrypt.hash(faker.internet.userName(), 10);
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
        address: faker.location.streetAddress(),
        full_name: faker.person.fullName(),
        Foto: {
          create: {
            title_foto: faker.lorem.words({ min: 3, max: 5 }),
            description_foto: faker.lorem.words({ min: 3, max: 14 }),
            path: faker.image.url(),
            upload_date: faker.date.past(),
            KomentarFoto: {
                create: {
                  comment: faker.lorem.words({ min: 3, max: 14 }),
                  comment_date: new Date(),
                },
              },
          },
        },
      },
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
