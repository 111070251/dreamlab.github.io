'use client'

import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">夢境分析師</h1>
          <p className="text-xl mb-8">探索您的夢境世界，獲得專業的解析與視覺呈現</p>
          
          <div className="space-x-4">
            <Link 
              href="/auth/signin" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              開始探索
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              了解更多
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">夢境解析</h3>
            <p>通過先進的 AI 技術，獲得專業的夢境分析和解讀</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">圖像生成</h3>
            <p>將您的夢境轉化為獨特的視覺藝術作品</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">個人檔案</h3>
            <p>記錄並追踪您的夢境歷程，發現潛意識的模式</p>
          </div>
        </div>
      </div>
    </main>
  )
} 