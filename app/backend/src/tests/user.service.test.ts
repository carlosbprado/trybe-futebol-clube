import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import {validLogin, notPasswordLogin, notEmailLogin, invalidEmail,
  invalidPassword, formatInvalidEmail} from './Mocks/userMock'


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /login', () => {
  const app = new App();

  afterEach(() => {
    sinon.restore();
  })
  it('Testa se recebe o status ok ao fazer login corretamente', async() => {
    const response = await chai.request(app.app).post('/login').send(validLogin); 
    expect(response.status).to.be.equal(200)
    expect(response.body).to.haveOwnProperty('token')
  })
  it('Testa a mensagem de erro ao fazer o login sem senha', async() =>{
    const response = await chai.request(app.app).post('/login').send(notPasswordLogin)
    expect(response.body).to.be.deep.equal({message: "All fields must be filled"})
    expect(response.status).to.be.equal(400);
  })
  it('Testa a mensagem de erro ao fazer o login sem email', async() =>{
    const response = await chai.request(app.app).post('/login').send(notEmailLogin)
    expect(response.body).to.be.deep.equal({message: "All fields must be filled"})
    expect(response.status).to.be.equal(400);
  })
  it('Testa a mensagem de erro ao fazer o login com email invalido', async() =>{
    const response = await chai.request(app.app).post('/login').send(invalidEmail)
    expect(response.body).to.be.deep.equal({message: "Invalid email or password"})
    expect(response.status).to.be.equal(401);
  })
  it('Testa a mensagem de erro ao fazer o login com senha invalida', async() =>{
    const response = await chai.request(app.app).post('/login').send(invalidPassword)
    expect(response.body).to.be.deep.equal({message: "Invalid email or password"})
    expect(response.status).to.be.equal(401);
  })
  it('Testa a mensagem de erro ao fazer o login com email em formato invalido', async() =>{
    const response = await chai.request(app.app).post('/login').send(formatInvalidEmail)
    expect(response.body).to.be.deep.equal({message: "Invalid email or password"})
    expect(response.status).to.be.equal(401);
  })
});
