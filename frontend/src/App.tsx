import { Github } from 'lucide-react'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'

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
          <div className="grid flex-1 grid-rows-2 gap-4"></div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode utilizar a variáveis{' '}
            <code className="text-purple-400">{' {transcription} '}</code>no seu
            prompt para adicionar o conteúdo da transcrição do video selecionado
          </p>
        </div>
        <aside className="w-80">sidebar</aside>
      </main>
    </div>
  )
}
