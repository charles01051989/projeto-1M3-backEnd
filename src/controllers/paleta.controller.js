const { status } = require('express/lib/response');
const paletasService = require('../services/paleta.service');

const findAllPaletasController = (req, res) => {
  const paletas = paletasService.findAllPaletasService();
  if(paletas.length == 0){
    return res.status(404).send({message: 'Não existem paletas cadastradas!'})
  }
  res.send(paletas);
};

const findByIdPaletaController = (req, res) => {
  const idParam = Number(req.params.id);
  if (!idParam) {
    return res.status(400).send({ message: 'Paleta não encontrada!' });
  }
  const chosenPaleta = paletasService.findByIdPaletaService(idParam);

  if (!chosenPaleta) {
    res.status(404).send({ message: 'Paleta não encontrada' });
  }

  res.send(chosenPaleta);
};

const createPaletaController = (req, res) => {
  const paleta = req.body;

  if (
    !paleta ||
    !paleta.sabor ||
    !paleta.descricao ||
    !paleta.foto ||
    !paleta.preco
  ) {
    res.status(400).send({
      mensagem:
        'Você naõ preencheu todos os dados para adicionar uma nova paleta ao cardápio!',
    });
  }

  const newPaleta = paletasService.createPaletaService(paleta);
  res.status(201).send(newPaleta);
};

const updatePaletaController = (req, res) => {
  const idParam = +req.params.id;
  const paletaEdit = req.body;
  if (!idParam) {
    return res.status(404).send({ message: 'Paleta não encontrada!' });
  }
  if (
    !paletaEdit ||
    !paletaEdit.sabor ||
    !paletaEdit.descricao ||
    !paletaEdit.foto ||
    !paletaEdit.preco
  ) {
    return res
      .status(400)
      .send({
        message: 'Você não preencheu todos os dados para editar a paleta!',
      });
  }
  const updatedPaleta = paletasService.updatePaletaService(idParam, paletaEdit);
  res.send(updatedPaleta);
};

const deletePaletaController = (req, res) => {
  const idParam = +req.params.id;
  if (!idParam) {
    return res.status(404).send({ message: 'Paleta não encontrada!' });
  }
  paletasService.deletePaletaService(idParam);
  res.send({ message: 'Paleta deletada com sucesso!' });
};

module.exports = {
  findAllPaletasController,
  findByIdPaletaController,
  createPaletaController,
  updatePaletaController,
  deletePaletaController,
};
