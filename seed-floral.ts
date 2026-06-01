import { prisma } from './lib/prisma'

async function main() {
  const gardenTemplate = await prisma.template.upsert({
    where: { slug: 'floral-garden' },
    update: {},
    create: {
      name: 'Floral Garden',
      slug: 'floral-garden',
      category: 'nikah',
      basePrice: 69000,
      isActive: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop&q=80'
    },
  })

  console.log('Template created/updated:', gardenTemplate)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
