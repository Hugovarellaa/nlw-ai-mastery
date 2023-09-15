import { FileVideo, Github } from 'lucide-react'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
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
        <aside className="w-80 space-y-6">
          <form className="space-y-6">
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
          </form>
          <form className="space-y-6"></form>
        </aside>
      </main>
    </div>
  )
}
