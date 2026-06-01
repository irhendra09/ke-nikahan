import { prisma } from './lib/prisma'

async function main() {
  const islamicTemplate = await prisma.template.upsert({
    where: { slug: 'islamic' },
    update: {},
    create: {
      name: 'Islamic Emerald',
      slug: 'islamic',
      category: 'nikah',
      basePrice: 65000,
      isActive: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&auto=format&fit=crop&q=80'
    },
  })

  console.log('Template created/updated:', islamicTemplate)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
