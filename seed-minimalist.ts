import { prisma } from './lib/prisma'

async function main() {
  const minimalistTemplate = await prisma.template.upsert({
    where: { slug: 'minimalist' },
    update: {},
    create: {
      name: 'Modern Minimalist',
      slug: 'minimalist',
      category: 'nikah',
      basePrice: 59000,
      isActive: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1521665482312-300e1276a666?w=600&auto=format&fit=crop&q=80'
    },
  })

  console.log('Template created/updated:', minimalistTemplate)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
