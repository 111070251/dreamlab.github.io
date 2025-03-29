import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { message: '請提供夢境標題和內容' },
        { status: 400 }
      )
    }

    const prompt = `請分析以下夢境，提供專業的心理學解析：
標題：${title}
內容：${content}

請從以下幾個方面進行分析：
1. 夢境主題和核心象徵
2. 潛意識訊息
3. 可能的心理狀態
4. 建議和啟示`

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位專業的夢境分析師，擅長運用榮格分析法和心理學理論解析夢境。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error('Deepseek API 請求失敗')
    }

    const data = await response.json()
    const analysis = data.choices[0]?.message?.content || '無法生成分析結果'

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('夢境分析錯誤:', error)
    return NextResponse.json(
      { message: '分析過程中發生錯誤' },
      { status: 500 }
    )
  }
} 