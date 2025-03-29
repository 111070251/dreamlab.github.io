import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // 檢查必要欄位
    if (!email || !password) {
      return NextResponse.json(
        { message: '請提供所有必要資訊' },
        { status: 400 }
      )
    }

    // 檢查郵箱是否已被使用
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: '此郵箱已被註冊' },
        { status: 400 }
      )
    }

    // 創建新用戶
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      }
    })

    return NextResponse.json(
      { message: '註冊成功', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('註冊錯誤:', error)
    return NextResponse.json(
      { message: '註冊過程中發生錯誤' },
      { status: 500 }
    )
  }
} 