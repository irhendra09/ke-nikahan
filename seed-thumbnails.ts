import { prisma } from './lib/prisma'

async function main() {
  // Update floral template thumbnail
  await prisma.template.updateMany({
    where: { slug: 'floral' },
    data: { 
      thumbnailUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80' 
    }
  })

  // Update default template thumbnail
  await prisma.template.updateMany({
    where: { slug: 'default' },
    data: { 
      thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80' 
    }
  })

  console.log('Thumbnails updated!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
