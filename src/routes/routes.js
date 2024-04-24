const { Router } = require("express");
const routes = Router();

// Importar após a definição das rotas
const alunoRoutes = require("./alunos.route");
const cursoRoutes = require("./cursos.route");
const loginRoutes = require("./login.route");
const matriculaRoutes = require("./matriculas.route");
const professorRoutes = require("./professor.route");

routes.use('/alunos', alunoRoutes);
routes.use('/cursos', cursoRoutes);
routes.use('/login', loginRoutes);
routes.use('/matriculas', matriculaRoutes);
routes.use('/professor', professorRoutes);

module.exports = routes;
