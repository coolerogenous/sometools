import { startTransition, useDeferredValue, useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'book-blog-notes'

const initialNotes = [
  {
    id: 'note-1',
    title: '从《活着》里学到的克制叙事',
    category: '阅读笔记',
    tags: ['文学', '叙事', '余华'],
    summary: '记录人物命运如何被平静的讲述放大，让读者自己完成情绪共振。',
    content:
      '这本书最强的地方不在于事件密度，而在于作者几乎不替读者流泪。正因为叙述冷静，人物的命运才显得更重。做内容写作时，我也应该减少解释，用细节代替判断。',
    readingTime: '8 分钟',
    featured: true,
    updatedAt: '2026-03-16',
  },
  {
    id: 'note-2',
    title: '博客写作流程重构',
    category: '创作手记',
    tags: ['工作流', '写作', '效率'],
    summary: '把灵感收集、初稿、润色、发布拆成四个固定动作。',
    content:
      '过去我总是把写作当成一口气完成的事情，结果经常卡住。现在改成四段式流程后，任何一个时间段都能推进一点。博客系统也应该围绕这个过程组织内容。',
    readingTime: '5 分钟',
    featured: false,
    updatedAt: '2026-03-14',
  },
  {
    id: 'note-3',
    title: '技术博客也需要章节感',
    category: '产品想法',
    tags: ['博客', '设计', '结构'],
    summary: '让每篇文章像一本书中的一章，目录、摘要和正文层级更清晰。',
    content:
      '传统博客常常只是列表堆叠，但如果把整站做成一本持续生长的书，用户会更容易理解内容之间的关系。目录应该是章节视图，正文是翻页后的展开视图，管理操作则像批注系统。',
    readingTime: '6 分钟',
    featured: true,
    updatedAt: '2026-03-12',
  },
]

const emptyForm = {
  title: '',
  category: '',
  tags: '',
  summary: '',
  content: '',
  readingTime: '',
  featured: false,
}

function normalizeNotes(notes) {
  return notes.map((note) => ({
    ...note,
    tags: Array.isArray(note.tags)
      ? note.tags
      : String(note.tags || '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
  }))
}

function App() {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return initialNotes
    }

    try {
      return normalizeNotes(JSON.parse(stored))
    } catch {
      return initialNotes
    }
  })
  const [activeNoteId, setActiveNoteId] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return initialNotes[0].id
    }

    try {
      const parsed = normalizeNotes(JSON.parse(stored))
      return parsed[0]?.id ?? initialNotes[0].id
    } catch {
      return initialNotes[0].id
    }
  })
  const [editorMode, setEditorMode] = useState('create')
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [form, setForm] = useState(emptyForm)

  const deferredSearchText = useDeferredValue(searchText)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const categories = ['全部', ...new Set(notes.map((note) => note.category))]
  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      selectedCategory === '全部' || note.category === selectedCategory
    const query = deferredSearchText.trim().toLowerCase()
    const haystack = [note.title, note.summary, note.content, note.tags.join(' ')]
      .join(' ')
      .toLowerCase()

    return matchesCategory && (!query || haystack.includes(query))
  })

  const activeNote =
    notes.find((note) => note.id === activeNoteId) ?? filteredNotes[0] ?? notes[0]
  const featuredCount = notes.filter((note) => note.featured).length

  function resetForm() {
    setEditorMode('create')
    setForm(emptyForm)
  }

  function handleSelectNote(note) {
    startTransition(() => {
      setActiveNoteId(note.id)
    })
  }

  function handleEditNote(note) {
    setEditorMode('edit')
    setActiveNoteId(note.id)
    setForm({
      title: note.title,
      category: note.category,
      tags: note.tags.join(', '),
      summary: note.summary,
      content: note.content,
      readingTime: note.readingTime,
      featured: note.featured,
    })
  }

  function handleDeleteNote(noteId) {
    const remainingNotes = notes.filter((note) => note.id !== noteId)
    setNotes(remainingNotes)
    setActiveNoteId(remainingNotes[0]?.id ?? '')
    resetForm()
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextNote = {
      id: editorMode === 'edit' ? activeNoteId : `note-${Date.now()}`,
      title: form.title.trim(),
      category: form.category.trim() || '未分类',
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      summary: form.summary.trim(),
      content: form.content.trim(),
      readingTime: form.readingTime.trim() || '4 分钟',
      featured: form.featured,
      updatedAt: new Date().toISOString().slice(0, 10),
    }

    if (!nextNote.title || !nextNote.summary || !nextNote.content) {
      return
    }

    if (editorMode === 'edit') {
      setNotes((current) =>
        current.map((note) => (note.id === activeNoteId ? nextNote : note)),
      )
      setActiveNoteId(nextNote.id)
    } else {
      setNotes((current) => [nextNote, ...current])
      setActiveNoteId(nextNote.id)
    }

    resetForm()
  }

  return (
    <main className="library-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">PERSONAL BOOK BLOG</p>
          <h1>把博客做成一本可以持续编写的书</h1>
          <p className="hero-copy">
            用目录、章节和批注的方式管理你的博客笔记。支持新增、编辑、删除、
            分类筛选和关键词搜索，所有内容默认保存在本地浏览器中。
          </p>
        </div>
        <div className="hero-stats">
          <article>
            <strong>{notes.length}</strong>
            <span>总章节</span>
          </article>
          <article>
            <strong>{featuredCount}</strong>
            <span>精选笔记</span>
          </article>
          <article>
            <strong>{categories.length - 1}</strong>
            <span>内容分区</span>
          </article>
        </div>
      </section>

      <section className="toolbar">
        <label className="search-box">
          <span>搜索</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="搜索标题、摘要、正文或标签"
          />
        </label>

        <div className="category-tabs" aria-label="分类筛选">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === selectedCategory ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="book-stage">
        <div className="book-spine" aria-hidden="true" />

        <article className="book-page left-page">
          <div className="page-heading">
            <p className="page-index">目录</p>
            <h2>章节导航</h2>
          </div>

          <div className="chapter-list">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <button
                  key={note.id}
                  type="button"
                  className={`chapter-card ${activeNote?.id === note.id ? 'selected' : ''}`}
                  onClick={() => handleSelectNote(note)}
                >
                  <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{note.title}</strong>
                    <p>{note.summary}</p>
                    <small>
                      {note.category} · {note.updatedAt}
                    </small>
                  </div>
                </button>
              ))
            ) : (
              <div className="empty-state">
                <p>没有匹配的章节。</p>
                <span>换个关键词，或者新建一篇笔记。</span>
              </div>
            )}
          </div>
        </article>

        <article className="book-page right-page">
          {activeNote ? (
            <>
              <div className="page-heading">
                <p className="page-index">
                  {activeNote.featured ? '精选章节' : '当前章节'}
                </p>
                <h2>{activeNote.title}</h2>
              </div>

              <div className="note-meta">
                <span>{activeNote.category}</span>
                <span>{activeNote.readingTime}</span>
                <span>更新于 {activeNote.updatedAt}</span>
              </div>

              <p className="note-summary">{activeNote.summary}</p>
              <div className="note-tags">
                {activeNote.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="note-content">
                {activeNote.content.split('\n').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="page-actions">
                <button type="button" onClick={() => handleEditNote(activeNote)}>
                  编辑本章
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => handleDeleteNote(activeNote.id)}
                >
                  删除本章
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>还没有内容。</p>
              <span>先在下方创建第一篇博客笔记。</span>
            </div>
          )}
        </article>
      </section>

      <section className="editor-panel">
        <div className="editor-heading">
          <div>
            <p className="eyebrow">{editorMode === 'edit' ? 'EDIT NOTE' : 'NEW NOTE'}</p>
            <h2>{editorMode === 'edit' ? '编辑当前章节' : '新增博客章节'}</h2>
          </div>

          {editorMode === 'edit' ? (
            <button type="button" className="ghost-button" onClick={resetForm}>
              取消编辑
            </button>
          ) : null}
        </div>

        <form className="editor-form" onSubmit={handleSubmit}>
          <label>
            标题
            <input
              type="text"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="例如：一本书式博客的设计草图"
              required
            />
          </label>

          <label>
            分类
            <input
              type="text"
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({ ...current, category: event.target.value }))
              }
              placeholder="阅读笔记 / 创作手记 / 产品想法"
            />
          </label>

          <label>
            标签
            <input
              type="text"
              value={form.tags}
              onChange={(event) =>
                setForm((current) => ({ ...current, tags: event.target.value }))
              }
              placeholder="用逗号分隔，例如：写作, 结构, 设计"
            />
          </label>

          <label>
            阅读时长
            <input
              type="text"
              value={form.readingTime}
              onChange={(event) =>
                setForm((current) => ({ ...current, readingTime: event.target.value }))
              }
              placeholder="6 分钟"
            />
          </label>

          <label className="wide">
            摘要
            <textarea
              rows="3"
              value={form.summary}
              onChange={(event) =>
                setForm((current) => ({ ...current, summary: event.target.value }))
              }
              placeholder="用一段简短的话概括这篇内容。"
              required
            />
          </label>

          <label className="wide">
            正文
            <textarea
              rows="8"
              value={form.content}
              onChange={(event) =>
                setForm((current) => ({ ...current, content: event.target.value }))
              }
              placeholder="这里写你的博客正文。支持分段换行。"
              required
            />
          </label>

          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm((current) => ({ ...current, featured: event.target.checked }))
              }
            />
            设为精选章节
          </label>

          <div className="form-actions wide">
            <button type="submit">{editorMode === 'edit' ? '保存修改' : '创建章节'}</button>
            <button type="button" className="ghost-button" onClick={resetForm}>
              清空表单
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default App
