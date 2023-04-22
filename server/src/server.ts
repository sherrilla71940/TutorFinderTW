import app, {PORT, HOST} from './app'


app.listen(PORT, () => {
  console.log(`app listening at http://${HOST}:${PORT}`)
})
