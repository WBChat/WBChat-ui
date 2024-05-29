import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import { v4 as uuidv4 } from 'uuid'
import { SocketContext } from '@context'
import { EditingMessageContext } from 'src/shared/context/editingMessage/EditingMessageContext'
import { Box, Typography, useEventCallback } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'
import { AttachmentsService } from '@api'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { Editor as TEditor } from 'tinymce'

import { EditorContainer, Quote, QuoteBody } from './Editor.styles'
import { FileAttachment } from '../FileAttachment/FileAttachment.component'

interface EditorProps {
  onSend: (v: string, files: string[]) => void
  onResize: (offset: number) => void
  channelId: string
}

export const Editor: React.FC<EditorProps> = ({
  onSend,
  channelId,
  onResize,
}) => {
  const { socket } = useContext(SocketContext)
  const { editingMessage, clearEdit } = useContext(EditingMessageContext)
  const editorRef = useRef<TEditor>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')
  const [files, setFiles] = useState<
    Record<string, { name: string; ext: string; size: number }>
  >({})
  const [progress, setProgress] = useState<string[]>([])

  const handleEditorInit = (evt: unknown, editor: TEditor): void => {
    editorRef.current = editor
  }

  useEffect(() => {
    if (editingMessage) {
      setText(editingMessage.text)
      editorRef.current?.focus()
      editorRef.current?.setContent(editingMessage.text)
      editorRef.current?.selection.select(editorRef.current.getBody(), true)
      editorRef.current?.selection.collapse(false)

      if (editingMessage.files.length) {
        AttachmentsService.filesControllerGetFiles({
          ids: editingMessage.files,
        }).then(res => {
          setFiles(
            res.reduce((acc, file) => {
              const parts = file.filename.split('.')
              const ext = parts[parts.length - 1]
              const name = parts.slice(0, parts.length - 1).join('')

              return {
                ...acc,
                [file._id]: {
                  name,
                  ext,
                  size: file.length,
                },
              }
            }, {}),
          )
        })
      }
    }
  }, [editingMessage])

  useEffect(() => {
    if (Object.values(files).length && editingMessage) {
      onResize(380)

      return
    }

    if (Object.values(files).length) {
      onResize(320)

      return
    }
    onResize(268)
  }, [files, editingMessage])

  const handleSubmit = useEventCallback((value: string): void => {
    if (value.trim() && progress.length === 0) {
      if (editingMessage) {
        socket.emit('edit-message', {
          channelId,
          text: value,
          files: Object.keys(files),
          messageId: editingMessage._id,
        })
        closeEdit()

        return
      }
      onSend(value, Object.keys(files))
      setText('')
      setFiles({})
    }
  })

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = e.currentTarget.files?.[0]

    if (file) {
      const id = uuidv4()
      const parts = file.name.split('.')
      const ext = parts[parts.length - 1]
      const name = parts.slice(0, parts.length - 1).join('')

      setFiles(f => ({
        ...f,
        [id]: { name, ext, size: file.size },
      }))
      setProgress(prev => [...prev, id])

      const res = await AttachmentsService.filesControllerUploadFile({
        formData: { file },
      })

      setFiles(f => {
        delete f[id]

        return { ...f, [res]: { name, ext, size: file.size } }
      })
      setProgress(prev => prev.filter(i => i !== id))

      if (inputRef.current) {
        inputRef.current.value = ''
        inputRef.current.type = 'text'
        inputRef.current.type = 'file'
      }
    }
  }

  const closeEdit = (): void => {
    clearEdit()
    setText('')
    setFiles({})
  }

  const isEditing = editingMessage && editingMessage.channel_id === channelId

  return (
    <EditorContainer>
      {isEditing && (
        <Quote>
          <Typography color='#42a5f5' fontWeight={700} fontSize={14}>
            Edit message
          </Typography>
          <QuoteBody>
            <Typography fontSize={12} color='white'>
              <div dangerouslySetInnerHTML={{ __html: editingMessage.text }} />
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                right: '8px',
                top: '14px',
                cursor: 'pointer',
              }}
              onClick={closeEdit}
            >
              <CloseOutlined color='primary' fontSize='small' />
            </Box>
          </QuoteBody>
        </Quote>
      )}
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
            editor.ui.registry.addIcon(
              'attachment',
              `<svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 0C16.7614 0 19 2.23858 19 5V17C19 20.866 15.866 24 12 24C8.13401 24 5 20.866 5 17V9H7V17C7 19.7614 9.23858 22 12 22C14.7614 22 17 19.7614 17 17V5C17 3.34315 15.6569 2 14 2C12.3431 2 11 3.34315 11 5V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V6H15V17C15 18.6569 13.6569 20 12 20C10.3431 20 9 18.6569 9 17V5C9 2.23858 11.2386 0 14 0Z"
                fill="#8F8F92"
              />
            </svg>`,
            )
            editor.ui.registry.addButton('customButton', {
              icon: `attachment`,
              tooltip: 'Attachment',
              onAction: () => {
                inputRef.current?.click()
              },
            })
            editor.on('keydown', e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(editor.getContent().trim())
              }
            })
          },
          toolbar:
            'bold italic forecolor | ' +
            ' | bullist numlist outdent indent | ' +
            ' emoticons | info customButton',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background: #212325; color: #fff }}',
        }}
      />
      <Box
        sx={{ display: 'flex', padding: '6px 2px', gap: 1, overflowX: 'auto' }}
      >
        {Object.keys(files).map(key => {
          const file = files[key]

          return (
            <FileAttachment
              key={key}
              type='close'
              progress={progress.includes(key)}
              fileSize={file.size}
              filename={file.name}
              ext={file.ext}
              onAction={() => {
                setProgress(prev => prev.filter(i => i !== key))
                setFiles(prev => {
                  delete prev[key]

                  return { ...prev }
                })
              }}
            />
          )
        })}
      </Box>
      <input
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        ref={inputRef}
      />
    </EditorContainer>
  )
}
