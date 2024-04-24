const Aluno = require('../models/Aluno')

class AlunoController {
    // construtor
    // metodos 
    // atributos

    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll()
            res.json(alunos)
        } catch (error) {
            res.status(500).json({ error: 'Não possível listar os alunos' })
        }
    }


    async listarUm(req, res) {
        try {

            const { id } = req.params

            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ message: "Usuário não encontrado!" })
            }

            res.json(aluno)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: 'Não possível listar o aluno especifico',
                error: error
            })
        }
    }

    async cadastrar(req, res) {
        try {

            const email = req.body.email
            const password = req.body.password
            const nome = req.body.nome
            const data_nascimento = req.body.data_nascimento
            const celular = req.body.celular

            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' })
            }

            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento é não está no formato correto' })
            }

            const aluno = await Aluno.create({
                email: email,
                password: password,
                nome: nome,
                data_nascimento: data_nascimento,
                celular: celular
            })

            res.status(201).json(aluno)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível cadastrar o aluno' })
        }
    }

    async atualizar(req,res){
        const { id } = req.params

    const aluno = await Aluno.findByPk(id)

    if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' })
    }

    aluno.update(req.body)

    await aluno.save()

    res.json(aluno)
    }

    async deletar(req,res){
        const { id } = req.params

        Aluno.destroy({
            where: {
                id: id
            }
        }) 
    
        res.status(204).json({})
    }
}

module.exports = new AlunoController()

