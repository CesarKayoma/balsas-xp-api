import attractions from '../data/attractions.json' with { type: 'json' };

function nextId() {
  return attractions.reduce((maior, attraction) => Math.max(maior, attraction.id), 0) + 1;
}

export function listar(req, res) {
    const { categoria, tag } = req.query;
    let resultado = atracoes;

    if (categoria) {
        resultado = resultado.filter(
        (atracao) => atracao.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }

    if (tag) {
        resultado = resultado.filter((atracao) =>
        atracao.tags.some((cadaTag) => cadaTag.toLowerCase() === tag.toLowerCase())
        );
    }

    res.json(resultado);
}

export function buscarPorId(req, res) {
    const attraction = attractions.find(
        (item) => item.id === Number(req.params.id)
    );

    if (!attraction) {
        return res.status(404).json({ erro: 'Atração não encontrada' });
    }

    res.json(attraction);
}

export function criar(req, res) {
    const { nome, categoria, descricao, localizacao, distanciaCentroKm, tags } = req.body ?? {};
    
  if (!nome || !categoria || !descricao) {
    return res.status(400).json({
      erro: 'os campos nome, categoria e descrição são obrigatórios'
    });
  }

  const nova = {
    id: nextId(),
    nome,
    categoria,
    descricao,
    localizacao: localizacao ?? { cidade: 'Balsas', estado: 'MA' },
    distanciaCentroKm: distanciaCentroKm ?? null,
    tags: tags ?? [],
  };
  
  attractions.push(nova);
  res.status(201).location(`attractions/${nova.id}`).json(nova)
}

export function atualizar(req, res) {
    const id = Number(req.params.id);
  const indice = attractions.findIndex((item) => item.id === id);

  if(indice === -1) {
    return res.status(404).json({erro: 'Atração não encontrada'});
  }

  const { nome, categoria, descricao, localizacao, distanciaCentroKm, tags } = req.body ?? {}
  
  if(!nome || !categoria || !descricao) {
    return res.status(400).json({
      erro: 'Os campos nome, categoria e descrição são obrigatórios.',
    });
  }

  attractions[indice] = {
    id,
    nome,
    categoria,
    descricao,
    localizacao: localizacao ?? { cidade: 'Balsas', estado: 'MA' },
    distanciaCentroKm: distanciaCentroKm ?? null,
    tags: tags ?? [],
  };

  res.json(attractions[indice]);
}

export function remover(req, res) {
    const indice = atracoes.findIndex((item) => item.id === Number(req.params.id));
  
  if (indice === -1) {
    return res.status(404).json({ erro: 'Atração não encontrada' });
  }

  atracoes.splice(indice, 1);
  res.status(204).end();
}