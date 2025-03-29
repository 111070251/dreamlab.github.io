import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {
  try {
    const { description } = await request.json()

    if (!description) {
      return NextResponse.json(
        { message: '請提供夢境場景描述' },
        { status: 400 }
      )
    }

    const prompt = `A dreamlike, surreal artistic interpretation of the following dream scene: ${description}. Style: ethereal, mystical, with a mix of realism and fantasy elements.`

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    })

    const imageUrl = response.data.data[0].url

    if (!imageUrl) {
      throw new Error('無法生成圖片')
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('圖片生成錯誤:', error)
    return NextResponse.json(
      { message: '圖片生成過程中發生錯誤' },
      { status: 500 }
    )
  }
} 