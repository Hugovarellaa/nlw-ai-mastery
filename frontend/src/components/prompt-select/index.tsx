import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface Prompts {
  id: string
  title: string
  template: string
}

export function PromptSelect() {
  const [prompts, setPrompts] = useState<Prompts[] | null>(null)

  // Chamada com React Query - Indicação do diego

  async function loadPrompts() {
    const response = await api.get('/prompts')
    setPrompts(response.data.prompts)
  }

  useEffect(() => {
    loadPrompts()
  }, [])

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.title}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
