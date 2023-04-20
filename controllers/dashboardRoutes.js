
// Dashboard Routes
const router = require("express").Router();
const { Post, User, Comment } = require("../models/");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {
  const postsData = await Post.findAll({ 
    where: { userId: req.session.userId }, 
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      }
    ],
  });
  const posts = postsData.map((post) => post.get({ plain: true }));
  console.log(posts);
  res.render("admin-all-posts", { layout: "dashboard", posts });
  // refer to admin-all-posts.handlebars write the code to display the posts
});

router.get("/create", withAuth, async (req, res) => {
res.render("admin-create-post", { layout: "dashboard" });
});

router.post("/create", withAuth, async (req, res) => {
  try {
  await Post.create({
    title: req.body.title,
    body: req.body.body,
    userId: req.session.userId,
  })
  
  res.redirect('/dashboard');
} catch (err) {
  res.status(500).json(err);
}
})

module.exports = router;

