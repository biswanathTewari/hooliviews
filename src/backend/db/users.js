import { v4 as uuid } from 'uuid'
import { formatDate } from '../utils/authUtils'
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have likes (Likes are set to 0 by default), History Array, Playlists Array (added Watch Later Playlist in it by default) by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: 'Adarsh',
    lastName: 'Balika',
    email: 'adarshbalika@gmail.com',
    password: 'adarshBalika123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Galvin',
    lastName: 'Balson',
    email: 'galvin@hooli.com',
    password: 'hoolicloud',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Bizan',
    lastName: 'Tewari',
    email: 'bizan@hooli.com',
    password: 'hoolicloud',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
]
