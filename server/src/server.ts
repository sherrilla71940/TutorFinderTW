import app, {PORT, HOST} from './app'


// app.listen(PORT, () => {
app.listen(8080, () => {
  console.log(`app listening at http://${HOST}:${PORT}`)
})
