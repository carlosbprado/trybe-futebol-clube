import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import TeamsModel  from '../database/models/TeamsModel'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint /teams', () => {
  const teamsMock = [
    {
      id: 1,
      teamName: 'Avaí/Kindermann'
    },
    {
      id: 2,
      teamName: 'Bahia'
    },
    {
      id: 3,
      teamName: 'Botafogo'
    },
  ]
  const app = new App();

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(
        teamsMock as TeamsModel[]
      );
  });

  afterEach(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('Testa o status da rota', async () => {
    const response = await chai.request(app.app).get('/teams');
    expect(response.status).to.be.equal(200)
  });

  it('Testa o retorno dos times', async() => {
    const response = await chai.request(app.app).get('/teams');
    console.log(response.body);
    
    expect(response.body).to.be.deep.equal(teamsMock)
  })
});
