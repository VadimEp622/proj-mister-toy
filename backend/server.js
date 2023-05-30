// **************** START ****************:
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const http = require('http').createServer(app)

const { setupSocketAPI } = require('./services/socket.service')



// **************** App Configuration ****************:
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:8080',
            'http://localhost:8080',
            'http://127.0.0.1:3000',
            'http://localhost:3000'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body




// **************** Toys API ****************:
const { setupAsyncLocalStorage } = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)


const authRoutes = require('./api/auth/auth.routes')
app.use('/api/auth', authRoutes)

const userRoutes = require('./api/user/user.routes')
app.use('/api/user', userRoutes)

const toyRoutes = require('./api/toy/toy.routes')
app.use('/api/toy', toyRoutes)

const reviewRoutes = require('./api/review/review.routes')
app.use('/api/review', reviewRoutes)

setupSocketAPI(http)




// **************** END ****************:
// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
const port = process.env.PORT || 3030

// Listen will always be the last line in our server!
http.listen(port, () => {
    console.log(`App listening on port ${port}!`)
    if (process.env.NODE_ENV === 'production') {
        console.log('Hello render.com')
    }
    else console.log('Hello World!')
})