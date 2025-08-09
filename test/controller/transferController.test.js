//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//Aplicação
const app = require('../../app');

//Testes
describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistentes, recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "tiago",
                    to: "ricardo",
                    amount: 100
                });
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        });
        it('Quando o valor da transferência não é numerico, recebo um 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "tiago",
                    to: "ricardo",
                    amount: "abc123"
                })
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.deep.equal({ error: 'Campos obrigatórios: from, to, amount' })
        });
    });
});