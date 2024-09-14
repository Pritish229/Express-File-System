const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { isUtf8 } = require('buffer');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  fs.readdir('./file', (err, files) => {
    res.render('index', {files: files});
  })  
});

app.post('/addtask', (req, res) => {
  fs.writeFile(`./file/${req.body.title_text.split(' ').join()}.txt`, req.body.title_desc , (err) => {
    if (err) {
      console.log('Somthing went wrong' . err);
    }else{
      res.redirect('/');
    }
  })
})

app.get('/show/:name/' , (req,res) => {
  fs.readFile(`./file/${req.params.name}`, "utf-8" , (err , filedata)=>{
    if(err){
      console.log('File not found');
      res.send('File not found');
    }else{
      res.render('read', {title: req.params.name , desc:filedata});
    }
  })
})

app.get('/edit/:name/' , (req,res) => {
  fs.readFile(`./file/${req.params.name}`, "utf-8" , (err , filedata)=>{
    if(err){
      console.log('File not found');
      res.send('File not found');
    }else{
      res.render('edit', {title: req.params.name , desc:filedata});
    }
  })
})

app.post('/edit' , (req,res) => {
  fs.rename(`./file/${req.body.old_name}` , `./file/${req.body.title_text.split(' ').join()}.txt` , (err, file)=>{
    if(err){
      console.log('File not found');
      res.send('File not found');
    }else{
      fs.writeFile(`./file/${req.body.title_text.split(' ').join(',')}.txt`, req.body.title_desc , (err) => {
        if (err) {
          console.log('Somthing went wrong' + err);
        }else{
          res.redirect('/');
        }
      })
    }
  });
  
})

app.get('/delete/:file', (req,res) => {
  fs.rm(`./file/${req.params.file}`, (err, file)=>{
    if(err){
      console.log('File not found');
      res.send('File not found');
    }else{
      res.redirect('/');
    }
  })
});

app.listen(3000);




