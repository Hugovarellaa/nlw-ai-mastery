import { Github } from 'lucide-react'
import { Button } from './components/ui/button'

export function App() {
  return (
    <div>
      <header className="flex w-full items-center justify-between border-b px-6 py-3">
        <h1 className="text-xl font-bold">Upload.AI</h1>

        <nav className="flex items-center gap-5">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💜 no NLW da Rocketseat
          </span>
          <Button variant="outline" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            Github
          </Button>
        </nav>
      </header>
    </div>
  )
}
