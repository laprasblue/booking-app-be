import sequelize from '../utils/sequelize'

const retryConnectDB = async (retries: number): Promise<void> => {
  let index: number = retries
  while (index) {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
      break
    } catch (error) {
      console.log(error)
      index = +index - 1
      console.log(`retries left: ${index}`)
      await new Promise(res => setTimeout(res, 5000))
    }
  }
}
export default retryConnectDB
