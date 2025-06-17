import express from "express";
import cors from "cors"
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {
  let users;

  if (req.query.name || req.query.email || req.query.age) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany(); // <<< Aqui ajusta para usar a mesma variável
  }

  res.status(200).json(users);
});
/*Na rota quando precisamos guardar informações que estão sempre mudando como ex: idade ou endereço Usamos /:idade /:endereço para informar qual dado estamos buscando */
app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


/*HTTP status
    2xx -> Sucesso
    4xx -> Erro Cliente - Front and
    5xx -> Erro Servidor - Back and
*/

/*
    Criar nossa API de Usuários

    - Criar um usuário
    - Listar todos os Usuários
    - Editar um usuário
    - Deletar um usuárop
*/
