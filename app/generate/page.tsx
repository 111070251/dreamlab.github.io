'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DreamImageGeneration() {
  const { data: session } = useSession()
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/dreams/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.imageUrl)
      } else {
        const data = await response.json()
        setError(data.message || '圖片生成失敗，請稍後再試')
      }
    } catch (error) {
      setError('發生錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">夢境圖像生成</h1>
        
        <form onSubmit={generateImage} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              描述您的夢境場景
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="請詳細描述您夢境中的場景、人物、物件等..."
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {loading ? '生成中...' : '生成圖片'}
          </button>
        </form>

        {imageUrl && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">生成結果</h2>
            <div className="relative aspect-square w-full">
              <Image
                src={imageUrl}
                alt="生成的夢境圖像"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <button
              onClick={() => window.open(imageUrl, '_blank')}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-purple-600 rounded-md shadow-sm text-sm font-medium text-purple-600 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              查看原圖
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 