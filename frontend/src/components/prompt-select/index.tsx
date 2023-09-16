import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface Props {
  onPromptSelected: (template: string) => void
}

interface Prompts {
  id: string
  title: string
  template: string
}

export function PromptSelect({ onPromptSelected }: Props) {
  const [prompts, setPrompts] = useState<Prompts[] | null>(null)

  // Chamada com React Query - Indicação do diego

  async function loadPrompts() {
    const response = await api.get('/prompts')
    setPrompts(response.data.prompts)
  }

  function handlePromptSelected(id: string) {
    const selectedProps = prompts?.find((prompt) => prompt.id === id)

    if (!selectedProps) {
      return
    }

    onPromptSelected(selectedProps.template)
  }

  useEffect(() => {
    loadPrompts()
  }, [])

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
