import React from 'react'

const useDocumentTitle = title => {
  const [docTitle, setDocTitle] = React.useState(title)

  React.useEffect(() => {
    document.title = docTitle
  }, [docTitle])

  return [docTitle, setDocTitle]
}

export { useDocumentTitle }
