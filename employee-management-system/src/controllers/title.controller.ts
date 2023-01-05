import {
  Count,
  CountSchema,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { Title } from '../models';
import { TitleRepository } from '../repositories';

export class TitleController {
  constructor(
    @repository(TitleRepository)
    public titleRepository: TitleRepository,
  ) { }

  @post('/titles')
  @response(200, {
    description: 'Title model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Title) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Title, {
            title: 'NewTitle',
            exclude: ['id'],
          }),
        },
      },
    })
    title: Omit<Title, 'id'>,
  ): Promise<Title> {
    return this.titleRepository.create(title);
  }

  @get('/titles/count')
  @response(200, {
    description: 'Title model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Title) where?: Where<Title>,
  ): Promise<Count> {
    return this.titleRepository.count(where);
  }

  @get('/titles')
  @response(200, {
    description: 'Array of Title model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Title, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    // @param.filter(Title) filter?: Filter<Title>,
  ): Promise<Title[]> {
    return this.titleRepository.find();
  }

  @patch('/titles')
  @response(200, {
    description: 'Title PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Title, { partial: true }),
        },
      },
    })
    title: Title,
    @param.where(Title) where?: Where<Title>,
  ): Promise<Count> {
    return this.titleRepository.updateAll(title, where);
  }

  @get('/titles/{id}')
  @response(200, {
    description: 'Title model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Title, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    // @param.filter(Title, {exclude: 'where'}) filter?: FilterExcludingWhere<Title>
  ): Promise<Title> {
    return this.titleRepository.findById(id);
  }

  @patch('/titles/{id}')
  @response(204, {
    description: 'Title PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Title, { partial: true }),
        },
      },
    })
    title: Title,
  ): Promise<void> {
    await this.titleRepository.updateById(id, title);
  }

  @put('/titles/{id}')
  @response(204, {
    description: 'Title PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() title: Title,
  ): Promise<void> {
    await this.titleRepository.replaceById(id, title);
  }

  @del('/titles/{id}')
  @response(204, {
    description: 'Title DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.titleRepository.deleteById(id);
  }
}
