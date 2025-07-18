//@service UserService
//@route /register
//@auth protected
function registerUser(req, res) {
  const { username, password } = req.body;
  // logic to register user
  res.send({ status: "User registered" });
}
