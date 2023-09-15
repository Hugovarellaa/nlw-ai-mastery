import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileVideo, Github, Upload, Wand2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Separator } from './components/ui/separator'
import { Slider } from './components/ui/slider'
import { Textarea } from './components/ui/textarea'

export function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full items-center justify-between border-b px-6 py-3">
        <h1 className="text-xl font-bold">Upload.AI</h1>

        <nav className="flex items-center gap-5">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💜 no NLW da Rocketseat
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            Github
          </Button>
        </nav>
      </header>

      <main className="flex flex-1 gap-6 p-6">
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid flex-1 grid-rows-2 gap-4">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode utilizar a variáveis{' '}
            <code className="text-purple-400">{' {transcription} '}</code>no seu
            prompt para adicionar o conteúdo da transcrição do video selecionado
          </p>
        </div>
        <aside className="w-80 space-y-2">
          <form className="space-y-4">
            <label
              className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm hover:bg-primary/10"
              htmlFor="video"
            >
              <FileVideo className="h-4 w-4" />
              Selecione um vide
            </label>

            <input
              type="file"
              id="video"
              accept="video/mp4"
              className="sr-only"
            />

            <Separator />

            <div className="space-y-2">
              {/* Estilizar barra de rolagem da Textarea conforme o estilo da aplicação */}
              <Label htmlFor="transcription_prompt">
                Prompt de transcrição
              </Label>

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

          <Separator />

          <form className="space-y-6">
            {/* Prompt */}
            <div className="space-y-2">
              <Label>Modelo</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="title">Titulo do YouTube</SelectItem>
                  <SelectItem value="description">
                    Descrição do YouTube
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Modelo */}
            <div className="space-y-2">
              <Label>Modelo</Label>

              <Select disabled defaultValue="gpt3-turbo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gpt3-turbo">GPT 3.5</SelectItem>
                  <SelectItem value="gpt3-turbo-16k">
                    GPT 3.5-Turbo 16k
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs italic text-muted-foreground">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            {/* Temperatura */}
            <div className="space-y-4">
              <Label>Temperatura</Label>

              <Slider min={0} max={1} step={0.1} />

              <span className="block text-xs italic leading-relaxed text-muted-foreground">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possíveis errors
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Executar
              <Wand2 className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
