import { CommentServiceEntity } from '@/anterprise/entity/comment-service.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class CommentServiceRepository extends RepositoryAbstract<CommentServiceEntity> {}
