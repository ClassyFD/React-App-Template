module.exports = {
  getMemeDetails:(req, res)=>{
    let db = req.app.get('db'),
        id = req.params.id,
        query = req.query.commentPage,
        obj = {},
        meme_id;
    db.getMemeDetails([id]).then((response)=>{
      meme_id = response[0].meme_id;
      obj = Object.assign({}, obj, {details:response[0]});
      db.getMemeTags([meme_id]).then((response)=>{
        obj = Object.assign({}, obj, {tags:response})
        console.log(obj);
        db.getMemeComments([meme_id, (query-1)*20]).then((response)=>{
          obj = Object.assign({}, obj, {}, {comments:response});
          res.status(200).send(obj);
        })
      })
    })
  },
  submitUsername: (req, res)=>{
    let username = req.body.username,
        user = req.body.user,
        db = req.app.get('db');
    db.checkUsername([username]).then((response)=>{
      if (response.length===0) {
        db.submitUsername([username, user.id]).then((response)=>{
          res.status(200).send(response);
        })
      } else {
        res.status(200).send('Username Taken');
      }
    })
  },
  postMeme: (req, res)=>{
    let meme = req.body.meme,
        db = req.app.get('db');
    db.addMeme([meme.image.Location, 0, 0, meme.tags? meme.tags.length : 0, meme.caption, meme.image.key, req.body.user.id, (req.body.user.memes+1)]).then((finish)=>{
      res.status(200).send(finish);
      if (meme.tags[0]) {
        db.addTags([meme.tags[0].label, meme.image.key]).then((response)=>{
          if (meme.tags[1]) {
            db.addTags([meme.tags[1].label, meme.image.key]).then((response)=>{
              if (meme.tags[2]) {
                db.addTags([meme.tags[2].label, meme.image.key]).then((response)=>{
                  if (meme.tags[3]) {
                    db.addTags([meme.tags[3].label, meme.image.key]).then((response)=>{
                      if (meme.tags[4]) {
                        db.addTags([meme.tags[4].label, meme.image.key]).then((response)=>{
                           res.status(200).end();
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    });
  }
}