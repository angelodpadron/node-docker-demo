const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.info("Succesfuly connected to DB"))
  .catch((err) => console.error(err));

// middleware

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
    }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use(express.json());

// routes

// simple
app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

// express server initialization

const port = process.env.PORT || 3000;

app.listen(port, () => console.info(`Server running on localhost:${port}`));
