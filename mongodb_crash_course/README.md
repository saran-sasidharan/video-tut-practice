### Traversy Media Jul 16, 2019

Notes for command line usage of mongoDB

MogoDB compass for managing db from UI

Note that // in the code section below are just for the documentation purpose, not a valid mongo syntax.
``` mongodb
show dbs //show all dbs
use dbname //select and enter a db called dbname
show collections //show all collections in the dbname database, equavalent to table
db.dropDatabase() //drop/delete the current table, dbname

use acme //create and switch to acme db
show dbs //acme will not be shown because there are no collections
db //to check which db we are in
db.createCollection('posts') //create a collection in acme db called posts
show collections
```

Now lets start inserting documents/data
```
db.posts.insert({
  title: 'Post One',
  body: 'Body of post one',
  category: 'News',
  likes: 4,
  tags: ['news', 'events'],
  user: {
    name: 'Saran Sasidharan',
    status: 'author'
  },
  date: Date() //Will automatically add the current date and time
})

db.posts.insertMany([
  {
    title: 'Post Two',
    body: 'Body of post two',
    category: 'Technology',
    date: Date()
  },
  {
    title: 'Post Three',
    body: 'Body of post three',
    category: 'News',
    date: Date()
  },
  {
    title: 'Post Four',
    body: 'Body of post four',
    category: 'Entertainment',
    date: Date()
  }
])
```
Note that, unlike relational db's, we don't have strict data model in mongo

To query the data
```
db.posts.find() //shows all the posts we added
db.posts.find().pretty() //prettier version of all the posts, much easier ot read
db.posts.find({ category: 'News' }) //find posts with the matching argument, similar to where in sql
db.posts.find().sort({title: 1}) //sorts all posts based on title, where 1 for ascending and -1 for descending
db.posts.find({ category: 'News' }).count() //to count all posts in news category
db.posts.find().limit(2) //to limit the number of posts fetched
db.posts.find().forEach(function(doc) {print('Blog Post: '+doc.title)}) // loop through each post and print the title property in the format given in function
db.posts.findOne({ category: 'News' }) //return the first post with category news
```

To update the data
```
db.posts.update({ title: 'Post Two' },
  {
    title: 'Post Two',
    body: 'New post 2 body',
    date: Date()
  },
  { upsert: true } //optional parameter. upsert means if post with the title is not found then it will create/insert new one
) //replace the entire post with title 'Post Two', ideally should use _id

db.posts.update({ title: 'Post Two' },
  {
    $set: {
      body: 'Body of post two',
      category: 'Technology'
    }
  }
) //this just update the fields given in $set operator, it could be adding new field or updating existing one

db.posts.update({ title: 'Post One' }, { $inc: { likes: 2 } }) // $inc is increment operator, it increments the likes of post one by 2
db.posts.update({ title: 'Post One' }, { $rename: { likes: 'views' } }) // rename operator, rename likes to views in post one
```

To delete data
```
db.posts.remove({ title: 'Post Four' }) //Deletes the post with title POst Four, ideally _id should be used
```

##### Sub Documents
Can be used to add comments to our posts. 
In sql dbs, this is done by adding a new table and use the foreign key in posts table.
It is possible to add comments as a new collection if needed in mongo, but it's easier to work with as a sub document
```
db.posts.update({ title: 'Post One' },
  {
    $set: {
      comments: [
        {
          user: 'Swathy Sen',
          body: 'Comment One',
          date: Date()
        },
        {
          user: 'Sinu Sen',
          body: 'Comment Two',
          date: Date()
        }
      ]
    }
  }
) //comments would be embedded in the post one document

db.posts.find({
  comments: {
    $elemMatch: {
      user: 'Swathy Sen'
    }
  }
}) // finds the post with a comment from Swathy Sen, not sure about the role of $elemMatch
```

Search or wild text search.
For this, first create the index for the parameter.
Followed by actual search
```
db.posts.createIndex({ title: 'text' }) //create text index for title search
db.posts.find({
  $text: {
    $search: "\"Post O\""
  }
}) // will do a text search for 'Post O', which would return post one
```

Greater than or less than.
To understand this lets add views to post two and then compare
```
db.posts.update({ title: 'Post Two' }, { $set: { views: 10 } }) // add views to post two
db.posts.find({ views: { $gt: 6} }) // returns the posts with views greated than 7, which returns post two
db.posts.find({ views: { $gte: 6} }) // greater than or equal, returns both post one and two
// $lt and $lte for less than and less than & equal to
```

```
exit //to get out of shell
```
