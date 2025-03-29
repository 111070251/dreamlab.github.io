import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 創建默認標籤
  const defaultTags = [
    { name: '清醒夢', color: '#FF6B6B' },
    { name: '噩夢', color: '#4A4E69' },
    { name: '預知夢', color: '#9A8C98' },
    { name: '重複夢', color: '#C9ADA7' },
    { name: '童年夢', color: '#F2E9E4' },
  ]

  // 創建測試用戶
  const testUser = await prisma.user.create({
    data: {
      name: '測試用戶',
      email: 'test@example.com',
      password: await hash('password123', 12),
      settings: {
        create: {
          theme: 'dark',
          emailNotifications: true,
          language: 'zh-TW',
        },
      },
    },
  })

  // 為測試用戶創建標籤
  for (const tag of defaultTags) {
    await prisma.dreamTag.create({
      data: {
        ...tag,
        userId: testUser.id,
      },
    })
  }

  // 創建示例夢境
  await prisma.dream.create({
    data: {
      title: '飛行夢',
      content: '我夢見自己在城市上空飛翔，感覺非常自由和放鬆。天空是美麗的紫色，我可以看到下面的建築物和人群。',
      analysis: '這個夢境象徵著自由和超越現實限制的渴望。紫色天空可能代表靈性和創造力的啟發。',
      mood: '平靜',
      isPublic: true,
      userId: testUser.id,
      tags: {
        connect: [{ name: '清醒夢', userId: testUser.id }],
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 