import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

interface ArticleBodyProps {
  body: string
}

const ArticleBody = ({ body }: ArticleBodyProps) => {
  return (
    <div className="row article-content">
      <div
        className="col-md-12"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(body) as string),
        }}
      />
    </div>
  )
}

export default ArticleBody
