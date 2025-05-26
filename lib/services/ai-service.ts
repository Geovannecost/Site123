export class AIService {
  static async generateDescription(title: string, category: string): Promise<string> {
    // Simulate AI description generation
    // In production, this would call OpenAI, Claude, or another AI service

    const templates = {
      "plantas-interior": `Esta ${title.toLowerCase()} é perfeita para ambientes internos, trazendo vida e frescor para sua casa. Planta saudável e bem cuidada, ideal para quem busca decorar com natureza. Fácil de cuidar e adapta-se bem a diferentes condições de luz. Entregamos com vaso e instruções de cuidado.`,

      suculentas: `Lindas ${title.toLowerCase()} selecionadas especialmente para você. Suculentas são plantas resistentes e de baixa manutenção, perfeitas para iniciantes. Ideais para decoração de interiores e exteriores. Plantas saudáveis e prontas para o plantio.`,

      vasos: `${title} de alta qualidade, perfeito para suas plantas favoritas. Design moderno e funcional que combina com qualquer ambiente. Material resistente e durável. Ideal para plantas de pequeno a médio porte.`,

      ferramentas: `${title} profissional para jardinagem. Ferramenta de alta qualidade que facilita o cuidado com suas plantas. Ergonômica e durável, ideal tanto para iniciantes quanto para jardineiros experientes.`,

      sementes: `${title} de excelente qualidade e alta taxa de germinação. Sementes selecionadas e testadas para garantir os melhores resultados. Inclui instruções detalhadas de plantio e cuidados.`,

      fertilizantes: `${title} premium para nutrição completa das suas plantas. Fórmula balanceada que promove crescimento saudável e floração abundante. Fácil aplicação e resultados visíveis.`,

      decoracao: `${title} que adiciona charme e personalidade ao seu jardim. Peça decorativa de qualidade que resiste às intempéries. Perfeita para criar um ambiente acolhedor e natural.`,
    }

    const template =
      templates[category as keyof typeof templates] ||
      `${title} de excelente qualidade. Produto cuidadosamente selecionado para atender suas necessidades de jardinagem. Entrega rápida e segura.`

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return template
  }
}
