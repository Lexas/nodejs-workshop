# More dynamic views

What whe've done to our blog view is not very helpful yet, now that we added a way to add more blog posts and an endpoint to get them, we can display them on our view 

blog-read.jade
```
extends ./layout.jade

block content
	each post in posts
	æarticle
		header: h1 #{post.title} 
		p #{post.content}

```
