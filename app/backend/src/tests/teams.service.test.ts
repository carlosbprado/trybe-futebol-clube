import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import TeamsModel  from '../database/models/TeamsModel'
import {teamsMock, teamMock} from './Mocks/teamsMock'
import TeamsService from '../services/TeamsService';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /teams', () => {
  const app = new App();

  let chaiHttpResponse: Response;
  afterEach(() => {
    sinon.restore();
  })
  const teamService = new TeamsService();

  it('Testa o status da rota', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as TeamsModel[])
    const result = await teamService.findAll();
    expect(result).to.be.deep.equal(teamsMock)
  });

  it('Testa o retorno dos times', async() => {
    const response = await chai.request(app.app).get('/teams');
    console.log(response.body);
    
    expect(response.body).to.be.deep.equal(teamsMock)
  })

  it('testa o retorno de apenas 1 time', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves(teamMock as TeamsModel)
    const result = await teamService.findOne(1)
    expect(result).to.be.deep.equal(teamsMock[0])
  })
});
