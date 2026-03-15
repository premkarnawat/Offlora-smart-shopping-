import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'
import DeleteBlogButton from '@/components/admin/DeleteBlogButton'

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-bark-900" style={{ fontFamily: 'Cormorant, serif' }}>
            Blog Articles
          </h1>
          <p className="text-sm text-bark-500 font-sans mt-1">{blogs.length} articles total</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-bark-900 text-cream-100 px-4 py-2.5 text-xs tracking-widest uppercase font-sans hover:bg-bark-800 transition-colors"
        >
          <Plus size={14} strokeWidth={1.5} />
          New Article
        </Link>
      </div>

      <div className="bg-white border border-cream-300 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream-200">
              <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans">Title</th>
              <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans hidden md:table-cell">Author</th>
              <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans hidden lg:table-cell">Tags</th>
              <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                <td className="px-5 py-4">
                  <span className="text-sm text-bark-900 font-sans line-clamp-1">{blog.title}</span>
                </td>
                <td className="px-5 py-4 text-sm text-bark-600 font-sans hidden md:table-cell">{blog.author}</td>
                <td className="px-5 py-4 hidden lg:table-cell">
                  <div className="flex gap-1 flex-wrap">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-cream-200 px-2 py-0.5 text-bark-600 font-sans">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 font-sans ${
                    blog.isPublished ? 'bg-sage-300/30 text-sage-600' : 'bg-cream-200 text-bark-500'
                  }`}>
                    {blog.isPublished ? 'Live' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3 justify-end">
                    <Link href={`/admin/blogs/${blog.id}/edit`} className="text-bark-400 hover:text-bark-700 transition-colors">
                      <Pencil size={14} strokeWidth={1.5} />
                    </Link>
                    <DeleteBlogButton blogId={blog.id} blogTitle={blog.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
