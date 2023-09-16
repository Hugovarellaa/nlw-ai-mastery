import { Separator } from '@radix-ui/react-select'
import { FileVideo, Upload } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export function Video() {
  return (
    <form className="space-y-4">
      <label
        className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm hover:bg-primary/10"
        htmlFor="video"
      >
        <FileVideo className="h-4 w-4" />
        Selecione um vide
      </label>

      <input type="file" id="video" accept="video/mp4" className="sr-only" />

      <Separator />

      <div className="space-y-2">
        {/* Estilizar barra de rolagem da Textarea conforme o estilo da aplicação */}
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>

        <Textarea
          id="transcription_prompt"
          className="h-20 leading-relaxed"
          placeholder="Inclua palavras-chaves mencionadas no video separadas por vírgula (,)"
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar video
        <Upload className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
