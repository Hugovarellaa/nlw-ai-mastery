import { api } from '@/lib/axios'
import { initFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { Separator } from '@radix-ui/react-select'
import { FileVideo, Upload } from 'lucide-react'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessage = {
  converting: 'Convertendo...',
  uploading: 'Carregando...',
  generating: 'Transcrevendo...',
  success: 'Sucesso...',
}

interface Props {
  onVideoUploaded: (id: string) => void
}

export function Video({ onVideoUploaded }: Props) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')

  const promptIntRef = useRef<HTMLTextAreaElement>(null)

  async function convertVideoToAudio(video: File) {
    console.log('Starting video converter...')

    const ffmpeg = await initFFmpeg()

    // Quando usando o conceito de Assembly Web e como ser o ffmpeg nao tivesse rodando localmente...(Container docker)
    // writeFile -> coloca um arquivo dentro do contexto o ffmpeg
    // fetchFile -> Recebe um arquivo e converte para uma representação binaria do arquivo...
    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // Quando estiver dando erro des-comente essas linhas
    // ffmpeg.on('log', (log) => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', (progress) => {
      console.log('Converte progress: ' + Math.round(progress.progress * 100))
    })

    // Comando pego no Chat GP3
    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    console.log('Converting audio Finished')

    return audioFile
  }

  async function handleUploadVide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptIntRef.current?.value

    if (!videoFile) {
      return
    }

    setStatus('converting')

    // Converte o video em Audio
    // 1 - motivo - API OPEN AI so suporta arquivo até 25MB
    // 2 - Upload do video para API OPEN AI e pro Backend é + rápido

    const audioFile = await convertVideoToAudio(videoFile)

    // transformando dados do video em multipart-form para salvar no back-end
    const data = new FormData()
    data.append('file', audioFile)

    setStatus('uploading')

    // cadastrando video no back-end e buscando o id do video
    const response = await api.post('/upload-video', data)
    const videoId = response.data.video.id

    setStatus('generating')
    // Gerar transcrição do video
    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    })

    setStatus('success')
    onVideoUploaded(videoId)
  }

  async function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget
    if (!files) {
      return
    }

    const selectedFiles = files[0]

    setVideoFile(selectedFiles)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className="space-y-4" onSubmit={handleUploadVide}>
      <label
        className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm hover:bg-primary/10"
        htmlFor="video"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none"
          />
        ) : (
          <>
            <FileVideo className="h-4 w-4" />
            Selecione um vide
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        {/* Estilizar barra de rolagem da Textarea conforme o estilo da aplicação */}
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>

        <Textarea
          id="transcription_prompt"
          className="h-20 leading-relaxed"
          placeholder="Inclua palavras-chaves mencionadas no video separadas por vírgula (,)"
          ref={promptIntRef}
          disabled={status !== 'waiting'}
        />
      </div>

      <Button
        data-success={status === 'success'}
        disabled={status !== 'waiting'}
        type="submit"
        className="w-full text-white data-[success=true]:bg-emerald-400 data-[success=true]:text-black"
      >
        {status === 'waiting' ? (
          <>
            Carregar video
            <Upload className="ml-2 h-4 w-4" />
          </>
        ) : (
          statusMessage[status]
        )}
      </Button>
    </form>
  )
}
