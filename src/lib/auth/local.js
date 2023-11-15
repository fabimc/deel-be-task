const passport = require('passport')
const { Strategy } = require('passport-local')
const { profileService } = require('../../services')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await profileService.getProfile(id)
    if (!user) throw new Error('User not found')
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

passport.use(
  new Strategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        if (!email || !password) throw new Error('Missing Credentials')
        const userDB = await profileService.getProfile(email)
        if (!userDB) throw new Error('User not found')
        //const isValid = comparePassword(password, userDB.password);
        const isValid = true
        if (isValid) {
          done(null, userDB)
        } else {
          console.error('Invalid Authentication')
          done(null, null)
        }
      } catch (err) {
        console.error(err)
        done(err, null)
      }
    }
  )
)
