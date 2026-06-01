import { prisma } from './lib/prisma'

async function main() {
  const cinematicTemplate = await prisma.template.upsert({
    where: { slug: 'cinematic' },
    update: {},
    create: {
      name: 'Cinematic Dark',
      slug: 'cinematic',
      category: 'nikah',
      basePrice: 89000,
      isActive: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
    },
  })

  console.log('Template created/updated:', cinematicTemplate)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
