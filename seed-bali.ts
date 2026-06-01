import { prisma } from './lib/prisma'

async function main() {
  const baliTemplate = await prisma.template.upsert({
    where: { slug: 'bali' },
    update: {},
    create: {
      name: 'Tradisional Bali',
      slug: 'bali',
      category: 'nikah',
      basePrice: 75000,
      isActive: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80'
    },
  })

  console.log('Template created/updated:', baliTemplate)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
