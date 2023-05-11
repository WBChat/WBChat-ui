import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import { useRef, useState } from 'react'
import { Editor as TEditor } from 'tinymce'

import { EditorContainer } from './Editor.styles'

interface EditorProps {
  onSend: (v: string) => void
}

export const Editor: React.FC<EditorProps> = ({ onSend }) => {
  const editorRef = useRef<TEditor>()
  const [text, setText] = useState('')

  const handleEditorInit = (evt: unknown, editor: TEditor): void => {
    editorRef.current = editor
  }

  const handleSubmit = (value: string): void => {
    onSend(value)
    setText('')
  }

  return (
    <EditorContainer>
      <TinyEditor
        tinymceScriptSrc={`${process.env.PUBLIC_URL}/tinymce/tinymce.min.js`}
        onInit={handleEditorInit}
        value={text}
        onEditorChange={setText}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'insertdatetime',
            'media',
            'emoticons',
          ],
          setup: editor => {
            editor.on('keydown', e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(editor.getContent())
              }
            })
          },
          toolbar:
            'blocks | ' +
            'bold italic forecolor | ' +
            ' | bullist numlist outdent indent | ' +
            ' emoticons | info',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </EditorContainer>
  )
}
