import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Wand2 } from 'lucide-react'
import { useState } from 'react'
import { Header } from './components/header'
import { PromptSelect } from './components/prompt-select'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Separator } from './components/ui/separator'
import { Slider } from './components/ui/slider'
import { Textarea } from './components/ui/textarea'
import { Video } from './components/video/input-form'

export function App() {
  const [temperature, setTemperature] = useState(0.5)

  function handlePromptSelected(template: string) {
    console.log(template)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

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
          <Video />

          <Separator />

          <form className="space-y-6">
            {/* Prompt */}
            <div className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={handlePromptSelected} />
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

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
                // O Slider e sempre tratado como 2
                // por isso usamos no modelo de array para trata-lo
              />

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
