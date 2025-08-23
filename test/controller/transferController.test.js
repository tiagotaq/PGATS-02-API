//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//Aplicação
const app = require('../../app');

//Mock
const transferService = require('../../service/transferService');

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
        it('Usando mocks: Quando informo remetente e destinatário inexistentes, recebo 400', async () => {
            // Mocar apenas a funçao transfer do service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "tiago",
                    to: "ricardo",
                    amount: 100
                });
            //expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

            //reseto o mock
            sinon.restore();
        });
        it('Usando mocks: Quando informo valores válidos, recebo um 201', async () => {
            // Mocar apenas a funçao transfer do service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({ 
                from: "tiago",
                to: "ricardo",
                amount: 100,
                date: new Date()
             });

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "tiago",
                    to: "ricardo",
                    amount: 100
                });
            expect(resposta.status).to.equal(201)
            expect(resposta.body).to.have.property('from', 'tiago')

            //reseto o mock
            sinon.restore();
        });
    });
});