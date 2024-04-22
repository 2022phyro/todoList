const supabaseClient = require('../config/supabase')

async function login(req, res) {
  const {data, error} = await supabaseClient.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password
})
await supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
})
if (error) {
    console.log(error);
    res.status(401).send("Email/password combination is wrong.");
}
else {
    const { data: { user } } = await supabaseClient.auth.getUser();
    console.log(user);
    res.status(202).send("Login successful.");
}
}

async function logout(req, res) {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Logged out successfully' });
}

async function signup(req, res) {
  const { email, password } = req.body;

  const { user, error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ user });
}

async function deleteAccount(req, res) {
  const { error } = await supabaseClient.auth.api.deleteUser(supabaseClient.auth.session().access_token);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Account deleted successfully' });
}

module.exports = {
  login,
  logout,
  signup,
  deleteAccount
}