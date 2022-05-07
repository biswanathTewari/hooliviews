import { v4 as uuid } from 'uuid'

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: 'Technology',
    description: 'Tech is another name for hooli.',
  },
  {
    _id: uuid(),
    categoryName: 'Life',
    description: 'Life is a darlign adventure or nothing at all.',
  },
  {
    _id: uuid(),
    categoryName: 'Food',
    description: 'Noodles are everybodies favorite food.',
  },
]
