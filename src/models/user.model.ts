import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../utils/sequelize'

export interface UserAttributes {
  id: number
  username: string
  password: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default User
