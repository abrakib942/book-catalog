require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.estsi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("book-catalog");
    const booksCollection = db.collection("books");
    const usersCollection = db.collection("users");

    // Authentication
    app.post("/auth/signup", async (req, res) => {
      const userData = req.body;

      const isExistUser = await usersCollection.findOne({
        email: userData.email,
      });
      if (isExistUser) {
        return res.status(400).send({
          message: "This email already exist!",
        });
      } else {
        // hashing password
        const hashedPassword = await bcrypt.hash(userData.password, 12);

        userData.password = hashedPassword;

        const result = await usersCollection.insertOne(userData);
        if (result.acknowledged == true) {
          return res.status(200).send({
            message: "User sign up successfully!",
          });
        } else {
          return res.status(400).send({
            message: "Sign Up Failed!",
          });
        }
      }
    });

    app.post("/auth/login", async (req, res) => {
      const userData = req.body;
      const isAvailableUser = await usersCollection.findOne({
        email: userData.email,
      });
      if (!isAvailableUser) {
        return res.status(400).send({
          message: "This email does not exist!",
        });
      } else {
        const isPasswordMatched = await bcrypt.compare(
          userData.password,
          isAvailableUser.password
        );
        if (!isPasswordMatched) {
          return res.status(400).send({
            message: "Incorrect Password!",
          });
        } else {
          const accessToken = await jwt.sign(
            { email: isAvailableUser.email },
            "accessToken",
            { expiresIn: "30d" }
          );
          return res.status(200).send({
            message: "Login successfully!",
            token: accessToken,
          });
        }
      }
    });

    // Books
    app.get("/books", async (req, res) => {
      const { search, genre, publicationYear } = req.query;

      const filter = {};

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
          { genre: { $regex: search, $options: "i" } },
        ];
      }

      if (genre) {
        filter.genre = genre;
      }

      if (publicationYear) {
        filter.publicationDate = {
          $regex: `^${publicationYear}-`,
          $options: "i",
        };
      }

      const books = await booksCollection.find(filter).toArray();
      return res.status(200).send({
        message: "Books retrieved successfully!",
        data: books,
      });
    });

    app.get("/book/:id", async (req, res) => {
      const bookId = req.params.id;
      const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });

      if (book) {
        return res.status(200).send({
          message: "Book details retrieved successfully!",
          data: book,
        });
      } else {
        return res.status(404).send({
          message: "Book not found",
        });
      }
    });

    app.get("/books/recent", async (req, res) => {
      const sort = { publishedDate: -1 };
      const result = await booksCollection
        .find({})
        .sort(sort)
        .limit(10)
        .toArray();
      return res.status(200).send({
        message: "Recent Published Books retrieved successfully!",
        books: result,
      });
    });

    app.post("/books/add-book", async (req, res) => {
      const authorizeToken = req.headers.authorization;
      if (!authorizeToken) {
        return res.status(400).send({
          message: "Authorization not provided",
        });
      } else {
        const verifiedUser = await jwt.verify(authorizeToken, "accessToken");
        if (!verifiedUser) {
          return res.status(400).send({
            message: "You are not authorized",
          });
        } else {
          const bookData = req.body;
          const result = await booksCollection.insertOne(bookData);
          if (result.acknowledged == true) {
            return res.status(200).send({
              message: "Book added successfully!",
              data: bookData,
            });
          } else {
            return res.status(400).send({
              message: "Book added failed!",
            });
          }
        }
      }
    });

    app.patch("/book/update-book/:id", async (req, res) => {
      const authorizeToken = req.headers.authorization;
      if (!authorizeToken) {
        return res.status(400).send({
          message: "Authorization not provided",
        });
      } else {
        const verifiedUser = await jwt.verify(authorizeToken, "accessToken");
        if (!verifiedUser) {
          return res.status(400).send({
            message: "You are not authorized",
          });
        } else {
          const bookId = req.params.id;
          const updatedBookData = req.body;

          delete updatedBookData._id;

          const result = await booksCollection.updateOne(
            { _id: new ObjectId(bookId) },
            { $set: updatedBookData }
          );

          if (result.matchedCount > 0) {
            return res.status(200).send({
              message: "Book updated successfully!",
              book: updatedBookData,
            });
          } else {
            return res.status(404).send({
              message: "Book not found",
            });
          }
        }
      }
    });

    app.delete("/book/:id", async (req, res) => {
      const authorizeToken = req.headers.authorization;
      if (!authorizeToken) {
        return res.status(400).send({
          message: "Authorization not provided",
        });
      } else {
        const verifiedUser = await jwt.verify(authorizeToken, "accessToken");
        if (!verifiedUser) {
          return res.status(400).send({
            message: "You are not authorized",
          });
        } else {
          const bookId = req.params.id;

          const result = await booksCollection.deleteOne({
            _id: new ObjectId(bookId),
          });

          if (result.deletedCount > 0) {
            return res.status(200).send({
              message: "Book deleted successfully!",
            });
          } else {
            return res.status(404).send({
              message: "Book not found",
            });
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
