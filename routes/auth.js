const express = require('express')
const passport = require('passport')
const router = express.Router()

//GET '/auth/google'
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

//GET '/auth/google/callback'
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req,res) => {
    res.redirect('/dashboard')
})

function handleLogout(req, res, next) {
  req.logout((error) => {
    if (error) return next(error)

    req.session.destroy((sessionError) => {
      if (sessionError) return next(sessionError)
      res.clearCookie('connect.sid')
      return res.redirect('/')
    })
  })
}

// '/logout'
router.get('/logout', handleLogout)
router.post('/logout', handleLogout)


module.exports = router
