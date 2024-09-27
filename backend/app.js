const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
const { log } = require("console");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const secretKey = "your_secret_key_here"; // Replace with a secure secret key

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token.replace("Bearer ", ""), secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
}

// Read data from data.json
function readDataFromFile() {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { users: [], games: [], categories: [] };
  }
}

// Write data to data.json
function writeDataToFile(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2), "utf8");
}

// User registration
app.post("/api/register", (req, res) => {
  const { username, password, email } = req.body;
  const data = readDataFromFile();

  if (data.users.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = {
    id: Date.now(),
    username,
    password, // In a real application, you should hash this password
    email
  };

  data.users.push(newUser);
  writeDataToFile(data);

  res.status(201).json({ message: "User registered successfully" });
});

// User login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const data = readDataFromFile();

  const user = data.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.isAdmin } });
});

// Get all games
app.get("/api/slider", (req, res) => {
  const data = readDataFromFile();
  res.json(data.slider);
});

// Get all games
app.get("/api/games", (req, res) => {
  const data = readDataFromFile();
  res.json(data.games);
});  

//Get game by ID
app.get("/api/games/title=:id", (req, res) => {
  const data = readDataFromFile();
  const game = data.games.find(g => g.title === req.params.id);
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json(game);
});


// Delete a game (protected route)
app.delete("/api/games/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const data = readDataFromFile();

  const index = data.games.findIndex(g => g.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Game not found" });
  }

  data.games.splice(index, 1);
  writeDataToFile(data);
  res.json({ message: "Game deleted successfully" });
});

// Get all categories
app.get("/api/categories", (req, res) => {
  const data = readDataFromFile();
  res.json(data.categories);
});

// Add a new game (protected route)
app.post("/api/games", authenticateToken, (req, res) => {
  const newGame = req.body;
  const data = readDataFromFile();

  newGame.id = Date.now().toString();
  data.games.push(newGame);

  writeDataToFile(data);
  res.status(201).json(newGame);
});

// Update a game (protected route)
app.put("/api/games/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const updatedGame = req.body;
  const data = readDataFromFile();

  const index = data.games.findIndex(g => g.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Game not found" });
  }

  data.games[index] = { ...data.games[index], ...updatedGame };
  writeDataToFile(data);
  res.json(data.games[index]);
});


// Get games by partial title
app.get("/api/games/search=:query", (req, res) => {
  const data = readDataFromFile();
  const query = req.params.query.toLowerCase();

  // Find games whose titles include the query (case-insensitive)
  const matchingGames = data.games.filter(game => 
    game.title.toLowerCase().includes(query)
  );

  if (matchingGames.length === 0) {
    return res.status(404).json({ message: "No games found matching the search query" });
  }

  // Return only the titles of matching games
  res.json(matchingGames.map(game => game.title));
});

// Delete a game (protected route)
app.delete("/api/games/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const data = readDataFromFile();

  const index = data.games.findIndex(g => g.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Game not found" });
  }

  data.games.splice(index, 1);
  writeDataToFile(data);
  res.json({ message: "Game deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});