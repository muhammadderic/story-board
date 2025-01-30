import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { story } from './story'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, story],
}
