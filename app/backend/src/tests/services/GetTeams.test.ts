import Sinon from 'sinon'
import { Model} from 'sequelize'
import TeamsService from '../../services/TeamsService';
import { IServiceTeam } from '../../interfaces/IServiceTeam';
import Team from '../../database/models/TeamsModel';

describe('Testes de serviço get Teams', () => {
    afterEach(() => {
        Sinon.restore();
    })
    it('Caso deve acessar a rota /teams  ', async () =>{
        const outputMock: Team[] = [ new Team({
            
            {  "id": 1,
              "teamName": "Avaí/Kindermann"},
             { "id": 2,
              "teamName": "Bahia"},
             { "id": 3,
              "teamName": "Botafogo"},
        })]


        Sinon.stub(Model, 'findAll').resolves();
        const service = new TeamsService();
        const result = await service.getAll();

        expect(result).to.be.equal()
    })
})