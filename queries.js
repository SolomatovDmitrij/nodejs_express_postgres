const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  post: 5432,
})

const getUsers = (request, response) => {
  pool.query('select * from users order by id asc', (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('select * from users where id=$1', [id], (error, result) => {
    if(error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body
  
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]
    , (error, result) => {
      if(error) {
        throw error
      }
      response.status(201).send(`User added with id = ${result.insertid}`)
  })
}

const updateUser = (request, response) => { 
  const id = request.params.id
  const { name, email }  = request.body
  pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]
    , (error, result) => {
      if(error) {
        throw error
      }
      response.status(200).send(`Update user with id = ${id}`)
  })
}

const deleteUser = (request, response) => {
  const id = request.params.id
   
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
    if(error) {
      throw error
    }
  
    response.status(200).send(`user delete with id = ${id}`)
   })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} 
