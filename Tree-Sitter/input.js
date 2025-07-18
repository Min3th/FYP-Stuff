//@service UserService
//@route /register
//@auth protected
function registerUser(req, res) {
  const { username, password } = req.body;
  // logic to register user
  res.send({ status: "User registered" });
}

//@service UserService
//@route /login
function loginUser(req, res) {
  const { username, password } = req.body;
  // logic to login user
  res.send({ token: "abc123" });
}

//@service OrderService
//@route /order/create
//@route /checkout
function createOrder(req, res) {
  const { items, userId } = req.body;
  // logic to create order
  res.send({ status: "Order created" });
}
