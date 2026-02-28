import { useState } from 'react'
import Header from '../components/Header'
import communityData from '../data/community.json'

function PostCard({ post, index }) {
  const [liked, setLiked]       = useState(post.liked)
  const [likes, setLikes]       = useState(post.likes)
  const [bouncing, setBouncing] = useState(false)

  const toggleLike = () => {
    if (!liked) { setBouncing(true); setTimeout(() => setBouncing(false), 400) }
    setLiked((v) => { setLikes((l) => (v ? l - 1 : l + 1)); return !v })
  }

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700/60 p-4 card-stagger"
      style={{ '--stagger': `${index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${post.avatarColor}`}>
          {post.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{post.author}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{post.role} · {post.time}</p>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{post.content}</p>

      <div className="flex items-center gap-5 mt-3 pt-3 border-t border-gray-50 dark:border-gray-700/50">
        <button onClick={toggleLike} className="flex items-center gap-1.5 active:opacity-80 transition-opacity">
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24" className={bouncing ? 'heart-pop' : ''}>
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
              stroke={liked ? '#F43F5E' : '#94A3B8'} strokeWidth="1.8"
              fill={liked ? '#F43F5E' : 'none'}
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <span className={`text-sm font-medium transition-colors ${liked ? 'text-rose-500' : 'text-gray-400 dark:text-gray-500'}`}>{likes}</span>
        </button>

        <button className="flex items-center gap-1.5 active:opacity-70 transition-opacity">
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">{post.replies}</span>
        </button>

        <button className="ml-auto active:opacity-70 transition-opacity">
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </article>
  )
}

export default function Community() {
  const [posts] = useState(communityData)

  return (
    <main className="pb-nav page-enter">
      <Header title="Community" subtitle="What founders are talking about" />

      <div className="mx-4 mt-3 bg-gradient-to-br from-[#5B6CF6] to-violet-600 rounded-2xl p-4 slide-down">
        <p className="text-white font-semibold text-sm">Share your story</p>
        <p className="text-white/70 text-xs mt-1">Ask questions, share updates, or find a co-founder.</p>
        <button className="mt-3 bg-white text-[#5B6CF6] text-xs font-semibold rounded-lg px-3 py-2 active:bg-white/90 transition-colors">
          Post an update
        </button>
      </div>

      <section className="px-4 mt-5 space-y-3">
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">Recent Posts</p>
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </section>

      <div className="mx-4 mt-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
        <p className="text-2xl mb-2">💬</p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">More conversations coming</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Be the first to start one</p>
      </div>
    </main>
  )
}
