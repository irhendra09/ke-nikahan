import { prisma } from './lib/prisma'

async function main() {
  const modernBlackTemplate = await prisma.template.upsert({
    where: { slug: 'modern-black' },
    update: {},
    create: {
      name: 'Modern Black',
      slug: 'modern-black',
      category: 'nikah',
      basePrice: 99000,
      isActive: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
    },
  })

  console.log('Template created/updated:', modernBlackTemplate)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
