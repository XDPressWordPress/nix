const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Seed admin user
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin', // Em produção, usar hash de senha
    },
  })

  // Seed properties
  const properties = [
    {
      title: 'Apartamento Luxuoso no Centro',
      description: 'Moderno apartamento de 3 quartos com vista panorâmica da cidade. Localizado em área nobre com fácil acesso a comércios e serviços.',
      price: 850000,
      address: 'Rua das Flores, 123 - Centro',
      bedrooms: 3,
      bathrooms: 2,
      area: 120.5,
      type: 'apartment',
      images: [
        'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
        'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
      ]
    },
    {
      title: 'Casa Moderna com Jardim',
      description: 'Belíssima casa com 4 quartos, jardim amplo e garagem para 2 carros. Ideal para famílias que buscam conforto e tranquilidade.',
      price: 1200000,
      address: 'Av. dos Ipês, 456 - Jardim América',
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      type: 'house',
      images: [
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
      ]
    },
    {
      title: 'Loft Industrial Downtown',
      description: 'Loft charmoso em prédio histórico revitalizado. Ambiente único com pé-direito alto e acabamentos industriais modernos.',
      price: 650000,
      address: 'Rua do Comércio, 789 - Centro Histórico',
      bedrooms: 1,
      bathrooms: 1,
      area: 80,
      type: 'apartment',
      images: [
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
      ]
    }
  ]

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: 'temp-id-' + property.title.replace(/\s+/g, '-').toLowerCase() },
      update: {},
      create: property,
    })
  }

  // Seed posts
  const posts = [
    {
      title: 'Mercado Imobiliário em Alta: Melhores Oportunidades de 2025',
      excerpt: 'Análise completa das tendências do mercado imobiliário e as melhores regiões para investir.',
      content: 'O mercado imobiliário brasileiro continua aquecido em 2025, com destaque para as regiões metropolitanas. As melhores oportunidades estão concentradas em bairros com boa infraestrutura e proximidade ao transporte público. Investidores devem focar em imóveis com potencial de valorização a longo prazo.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      title: 'Dicas para Primeira Compra: Guia Completo',
      excerpt: 'Tudo que você precisa saber antes de comprar seu primeiro imóvel.',
      content: 'Comprar o primeiro imóvel é um marco importante. É essencial pesquisar bem a região, verificar toda a documentação, avaliar o financiamento disponível e considerar custos extras como ITBI e cartório. Nossa equipe especializada está pronta para te orientar em cada etapa.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    },
    {
      title: 'Tendências de Design em Imóveis Modernos',
      excerpt: 'Conheça as principais tendências arquitetônicas e de decoração.',
      content: 'Os imóveis modernos apostam em conceitos open space, sustentabilidade e automação residencial. Cores neutras, materiais naturais e integração com áreas externas são elementos-chave. A funcionalidade e o bem-estar dos moradores são prioridades no design contemporâneo.',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg'
    }
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: 'temp-id-' + post.title.replace(/\s+/g, '-').toLowerCase() },
      update: {},
      create: post,
    })
  }

  console.log('Banco de dados povoado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })